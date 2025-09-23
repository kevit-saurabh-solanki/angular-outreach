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
  selectedMessage: MessageInterface | null = null;
  messageType!: string;
  errorMessage: string | null = null;

  private messageService = inject(MessageService);
  private sharedService = inject(SharedService);
  private campaignService = inject(CampaignService);

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private location: Location) { }


  ngOnInit() {
    //initialize the form--------------------------------------------------------------------------
    this.campaignForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      targetTags: [[], Validators.required],
      messageId: [null, Validators.required],
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
          this.sharedService.handleError(err);
        }
      });
    });

    // if campaign edit then patch existing values ----------------------------------------------------
    const campaignId = this.route.snapshot.paramMap.get('id');
    if (campaignId) {
      this.campaignService.getCampaignById(campaignId).subscribe({
        next: (campaign) => {
          this.campaign = campaign as CampaignInterface;

          this.campaignForm.patchValue({
            name: this.campaign.name,
            description: this.campaign.description,
            targetTags: this.campaign.targetTags,
            messageId: this.campaign.messageId
          });
        },
        error: (err) => this.sharedService.handleError(err)
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

  goBack() {
    this.location.back();
  }

  onMessageTemplateChange(event: any) {
    const selectedId = event.value;
    this.selectedMessage = this.messages.find(m => m._id === selectedId) || null;
  }

  // edit campaign ---------------------------------------------------------------------------------
  editCampaign() {
    if (this.campaignForm.invalid || !this.campaign) return;

    const formValue = this.campaignForm.value;
    const workspaceId = localStorage.getItem('workspaceId') || '';

    const campaignToEdit: SendCampaignInterface = {
      name: formValue.name,
      description: formValue.description,
      messageId: formValue.messageId,
      targetTags: formValue.targetTags,
      workspaceId
    };

    this.campaignService.editCampaign(campaignToEdit, this.campaign._id).subscribe({
      next: (result) => {
        this.campaignForm.reset();
        this.successMessage = true;
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.sharedService.handleError(err);
      }
    });
  }


  // add campaign ----------------------------------------------------
  addCampaign() {
    if (this.campaignForm.invalid) return;

    const formValue = this.campaignForm.value;
    const workspaceId = localStorage.getItem('workspaceId') || '';

    const campaignToAdd: SendCampaignInterface = {
      name: formValue.name,
      description: formValue.description,
      messageId: formValue.messageId,
      targetTags: formValue.targetTags,
      workspaceId
    };

    this.campaignService.addCampaign(campaignToAdd).subscribe({
      next: (result) => {
        this.campaignForm.reset();
        this.successMessage = true;
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.sharedService.handleError(err);
      }
    });
  }



}
