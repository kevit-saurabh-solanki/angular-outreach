import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CampaignInterface, SendCampaignInterface } from '../campaign.interface';
import { Location } from '@angular/common';
import { MessageService } from '../../Message/message.service';
import { SharedService } from '../../Shared/shared.service';
import { MessageInterface } from '../../Message/message.interface';
import { CampaignService } from '../campaign.service';

@Component({
  selector: 'app-campaign-form',
  templateUrl: './campaign-form.component.html',
  styleUrl: './campaign-form.component.scss'
})
export class CampaignFormComponent {
  campaignForm!: FormGroup;
  campaign!: CampaignInterface;
  successMessage!: boolean;
  messageTypeOption: any;
  messages!: MessageInterface[];

  private messageService = inject(MessageService);
  private sharedService = inject(SharedService);
  private campaignService = inject(CampaignService);

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private location: Location) { }


  ngOnInit() {
    //initialize the form--------------------------------------------------------------------------
    this.campaignForm = this.formBuilder.group({
      name: ['', Validators.required],
      messageId: ['', Validators.required],
      targetTags: [[], Validators.required],
      content: ['', Validators.required]
    });

    //get the message template in dropdown-------------------------------------------------------------
    this.sharedService.workspaceId$.subscribe(id => {
      if (!id) return;
      this.messageService.getMessagesByWorkspaceId(id).subscribe({
        next: (response) => {
          this.messages = response as MessageInterface[];

          this.messageTypeOption = this.messages.map(m => ({
            label: `${m.title} (${m.messageType})`,
            value: m._id
          }));
        },
        error: (err) => {
          console.error('Error loading messages', err);
        }
      });
    });

    //based on selected template patch content-------------------------------------------------------------
    this.campaignForm.get('messageId')?.valueChanges.subscribe(selectedId => {
      const selectedMessage = this.messages.find(m => m._id === selectedId);
      if (selectedMessage) {
        this.campaignForm.patchValue({ content: selectedMessage.content });
      }
    });

    //if campaign edit then patch existing values----------------------------------------------------
    const campaignId = this.route.snapshot.paramMap.get('id');
    if (campaignId) {
      this.campaignService.getCampaignById(campaignId).subscribe({
        next: (campaign) => {
          this.campaign = (campaign as CampaignInterface);

          this.campaignForm.patchValue({
            name: this.campaign.name,
            messageId: this.campaign.messageId.title,
            targetTags: this.campaign.targetTags,
            content: this.campaign.content,
          });
        },
        error: (err) => console.error('Error loading campaign:', err)
      });
    }
  }

  get name() {
    return this.campaignForm.get('name');
  }

  get messageId() {
    return this.campaignForm.get('messageId');
  }

  get targetTags() {
    return this.campaignForm.get('targetTags');
  }

  get content() {
    return this.campaignForm.get('content');
  }

  goBack() {
    this.location.back();
  }

  //edit campaign---------------------------------------------------------------------------------
  editCampaign() {
    if (this.campaignForm.invalid || !this.campaign) return;

    const formValue = this.campaignForm.value;
    const workspaceId = localStorage.getItem('workspaceId');

    const campaignToEdit: SendCampaignInterface = {
      name: formValue.name,
      messageId: formValue.messageId,
      content: formValue.content,
      targetTags: formValue.targetTags,
      workspaceId: workspaceId || ''
    };

    this.campaignService.editCampaign(campaignToEdit, this.campaign._id).subscribe({
      next: (result) => {
        this.campaignForm.reset();
        this.successMessage = true;
        console.log('Campaign edited:', result);
      },
      error: (err) => {
        console.error('Error editing campaign:', err);
      }
    });
  }

  //add campaign----------------------------------------------------
  addCampaign() {
    if (this.campaignForm.invalid) return;

    const formValue = this.campaignForm.value;
    const workspaceId = localStorage.getItem('workspaceId');

    const campaignToAdd: SendCampaignInterface = {
      name: formValue.name,
      messageId: formValue.messageId,
      targetTags: formValue.targetTags,
      content: formValue.content,
      workspaceId: workspaceId || ''
    };

    this.campaignService.addCampaign(campaignToAdd).subscribe({
      next: (result) => {
        this.campaignForm.reset();
        this.successMessage = true;
        console.log('Campaign added:', result);
      },
      error: (err) => {
        console.error('Error adding campaign:', err);
      }
    });
  }


}
