import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  computed,
  signal,
} from '@angular/core';
import { LimsStepItem } from './models/lims-stepper.models';


@Component({
  selector: 'app-lims-stepper',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lims-stepper-component.html',
  styleUrls: ['./lims-stepper-component.css'],
})
export class LimsStepperComponent {
  @Input() steps: LimsStepItem[] = [];
  @Input() activeIndex = 0;
  @Input() linear = true;
  @Input() clickable = true;

  @Output() activeIndexChange = new EventEmitter<number>();
  @Output() stepChange = new EventEmitter<LimsStepItem>();

  readonly safeActiveIndex = computed(() => {
    if (!this.steps.length) return 0;
    if (this.activeIndex < 0) return 0;
    if (this.activeIndex > this.steps.length - 1) return this.steps.length - 1;
    return this.activeIndex;
  });

  readonly lastCompletedIndex = computed(() => {
    let index = -1;
    for (let i = 0; i < this.steps.length; i++) {
      if (this.steps[i]?.status === 'completed') {
        index = i;
      }
    }
    return index;
  });

  isStepDisabled(step: LimsStepItem, index: number): boolean {
    if (step.disabled || step.status === 'disabled') return true;
    if (!this.linear) return false;

    const maxAllowed = Math.max(this.lastCompletedIndex() + 1, this.safeActiveIndex());
    return index > maxAllowed;
  }

  isActive(index: number): boolean {
    return index === this.safeActiveIndex();
  }

  isCompleted(index: number): boolean {
    return this.steps[index]?.status === 'completed';
  }

  isPending(index: number): boolean {
    return !this.isActive(index) && !this.isCompleted(index) && !this.isStepDisabled(this.steps[index], index);
  }

  goToStep(index: number): void {
    const step = this.steps[index];
    if (!step) return;
    if (!this.clickable) return;
    if (this.isStepDisabled(step, index)) return;

    this.activeIndex = index;
    this.activeIndexChange.emit(index);
    this.stepChange.emit(step);
  }

  next(): void {
    const nextIndex = this.safeActiveIndex() + 1;
    if (nextIndex >= this.steps.length) return;
    if (this.isStepDisabled(this.steps[nextIndex], nextIndex)) return;

    this.activeIndex = nextIndex;
    this.activeIndexChange.emit(nextIndex);
    this.stepChange.emit(this.steps[nextIndex]);
  }

  previous(): void {
    const prevIndex = this.safeActiveIndex() - 1;
    if (prevIndex < 0) return;

    this.activeIndex = prevIndex;
    this.activeIndexChange.emit(prevIndex);
    this.stepChange.emit(this.steps[prevIndex]);
  }

  trackByStep(_: number, step: LimsStepItem): string {
    return step.id;
  }
}