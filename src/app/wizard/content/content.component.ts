import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { FieldDetails } from '../../models/field-details';
import { StepperService } from '../../services/stepper.service';
import { UnsubscribeOnDestroyAdapter } from '../../services/unsubscribe-adapter.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent
extends UnsubscribeOnDestroyAdapter
implements AfterViewInit {

  @Output() public IsFieldValid: EventEmitter<boolean>;
  @Input() public Fields!: FieldDetails[];
  public FormGroupList!: FormGroup[];
  public THUMBUP_ICON =
  `
  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px">
    <path d="M0 0h24v24H0z" fill="none"/>
    <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.` +
  `44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5` +
  `1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z"/>
  </svg>
`;

  constructor(
    public stepperSrc: StepperService,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer) {
    super();
    this.IsFieldValid = new EventEmitter<boolean>();
    iconRegistry.addSvgIconLiteral('thumbs-up',
      sanitizer.bypassSecurityTrustHtml(this.THUMBUP_ICON));
  }

  ngAfterViewInit(): void {
    this.FormGroupList.forEach(fg => {
      this.subs.sink = fg.statusChanges
      .subscribe((status) =>
        this.IsFieldValid.emit(status === 'VALID'))});
    this.stepperSrc.OnStep
      .subscribe((step) =>
        this.IsFieldValid.emit(
          this.FormGroupList[step].status === 'VALID'));
  }

 public CtrlName(index: number): string {   
    return Object.keys(this.FormGroupList[index].value)[0];
  }
}
