import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { filter, take } from 'rxjs';
import { addField, loadFields, removeField, updateField } from 'src/app/state/wizard/wizard-actions';
import { selectAllFields } from 'src/app/state/wizard/wizard-selectors';
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
implements AfterViewInit, OnInit {

  @Output() public IsFieldValid: EventEmitter<boolean>;
  @Output() public FormGroupList: EventEmitter<FormGroup[]>;
  @Input() public FieldDetails!: FieldDetails[];
  public FormGroups!: FormGroup[];
  public THUMBUP_ICON =
  `<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px">
    <path d="M0 0h24v24H0z" fill="none"/>
    <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.` +
      `44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5` +
      `1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z"/>
  </svg>`;

  constructor(
    private formBuilder: FormBuilder,
    public stepperSrc: StepperService,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private store: Store) {
    super();
    this.FormGroupList = new EventEmitter<FormGroup[]>();
    this.IsFieldValid = new EventEmitter<boolean>();
    iconRegistry.addSvgIconLiteral('thumbs-up',
      sanitizer.bypassSecurityTrustHtml(this.THUMBUP_ICON));
  }

  ngOnInit(): void {
    this.initFormGroups();
  }

  ngAfterViewInit(): void {
    this.updateStatus();
    this.updateFields();
  }

  private updateStatus(): void {
    this.FormGroups.forEach(fg => {
      this.subs.sink = fg.statusChanges
      .subscribe((status) =>
        this.IsFieldValid.emit(status === 'VALID'))});
    this.subs.sink = this.stepperSrc.OnStep
      .pipe(filter((step) => step < this.stepperSrc.MaxStep))
      .subscribe((step) =>
        this.IsFieldValid.emit(
          this.FormGroups[step].status === 'VALID'));
  }

  private updateFields(): void {
    this.subs.sink = this.store.select((state: any) =>
      selectAllFields(state))
      .pipe(filter((fields) => fields.length > 0), take(1))
      .subscribe((fields) => {
        fields.forEach((v, i) => this.FormGroups.find(fg =>
          Object.keys(fg.value)[0] === v.id)!
          .controls[v.id].setValue(v.value));
      });
    this.FormGroups.forEach(fg => {
      this.subs.sink = fg.valueChanges
      .pipe(filter(() => fg.status === 'VALID'))
      .subscribe((ctrl) => {        
        const key = Object.keys(ctrl)[0];
        const value = Object.values(ctrl)[0] as string;
        this.store.dispatch(updateField({ id: key, value: value }));
        this.store.dispatch(loadFields()); // update state every time?
      })});
  }

  private initFormGroups(): void {
    this.FormGroups = [];

    for (let i = 0; i < this.stepperSrc.MaxStep; i++) {
      const ctrl = `ctrl${i}`;
      const gr = this.formBuilder.group({});
      gr.setControl(ctrl, this.formBuilder.control('', Validators.required));
      this.FormGroups.push(gr);      
    }
    this.FormGroupList.next(this.FormGroups);
  }

  public CtrlName(index: number): string {   
    return Object.keys(this.FormGroups[index].value)[0];
  }
}
