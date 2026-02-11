export { ButtonPreview } from './button-preview';
export { TextPreview } from './text-preview';
export { BadgePreview } from './badge-preview';
export { CardPreview } from './card-preview';
export { InputPreview } from './input-preview';
export { TextareaPreview } from './textarea-preview';
export { LabelPreview } from './label-preview';
export { SeparatorPreview } from './separator-preview';
export { SwitchPreview } from './switch-preview';
export { CheckboxPreview } from './checkbox-preview';
export { ProgressPreview } from './progress-preview';
export { AvatarPreview } from './avatar-preview';
export { TabsPreview } from './tabs-preview';
export { AccordionPreview } from './accordion-preview';
export { AlertPreview } from './alert-preview';
export { DialogPreview } from './dialog-preview';
export { AlertDialogPreview } from './alert-dialog-preview';
export { SelectPreview } from './select-preview';
export { DropdownMenuPreview } from './dropdown-menu-preview';
export { ContextMenuPreview } from './context-menu-preview';
export { MenubarPreview } from './menubar-preview';
export { PopoverPreview } from './popover-preview';
export { TooltipPreview } from './tooltip-preview';
export { HoverCardPreview } from './hover-card-preview';
export { RadioGroupPreview } from './radio-group-preview';
export { TogglePreview } from './toggle-preview';
export { ToggleGroupPreview } from './toggle-group-preview';
export { CollapsiblePreview } from './collapsible-preview';
export { SkeletonPreview } from './skeleton-preview';
export { SliderPreview } from './slider-preview';
export { TablePreview } from './table-preview';
export { IconPreview } from './icon-preview';
export { ThemeTogglePreview } from './theme-toggle-preview';
export { ToastPreview } from './toast-preview';
export { ChartPreview } from './chart-preview';
export { GlassViewPreview } from './glass-view-preview';
export { AspectRatioPreview } from './aspect-ratio-preview';

/** Map component slug to preview component */
export const previewMap: Record<string, () => Promise<{ default: React.ComponentType }>> = {
  button: () => import('./button-preview').then(m => ({ default: m.ButtonPreview })),
  text: () => import('./text-preview').then(m => ({ default: m.TextPreview })),
  badge: () => import('./badge-preview').then(m => ({ default: m.BadgePreview })),
  card: () => import('./card-preview').then(m => ({ default: m.CardPreview })),
  input: () => import('./input-preview').then(m => ({ default: m.InputPreview })),
  textarea: () => import('./textarea-preview').then(m => ({ default: m.TextareaPreview })),
  label: () => import('./label-preview').then(m => ({ default: m.LabelPreview })),
  separator: () => import('./separator-preview').then(m => ({ default: m.SeparatorPreview })),
  switch: () => import('./switch-preview').then(m => ({ default: m.SwitchPreview })),
  checkbox: () => import('./checkbox-preview').then(m => ({ default: m.CheckboxPreview })),
  progress: () => import('./progress-preview').then(m => ({ default: m.ProgressPreview })),
  avatar: () => import('./avatar-preview').then(m => ({ default: m.AvatarPreview })),
  tabs: () => import('./tabs-preview').then(m => ({ default: m.TabsPreview })),
  accordion: () => import('./accordion-preview').then(m => ({ default: m.AccordionPreview })),
  alert: () => import('./alert-preview').then(m => ({ default: m.AlertPreview })),
  dialog: () => import('./dialog-preview').then(m => ({ default: m.DialogPreview })),
  'alert-dialog': () => import('./alert-dialog-preview').then(m => ({ default: m.AlertDialogPreview })),
  select: () => import('./select-preview').then(m => ({ default: m.SelectPreview })),
  'dropdown-menu': () => import('./dropdown-menu-preview').then(m => ({ default: m.DropdownMenuPreview })),
  'context-menu': () => import('./context-menu-preview').then(m => ({ default: m.ContextMenuPreview })),
  menubar: () => import('./menubar-preview').then(m => ({ default: m.MenubarPreview })),
  popover: () => import('./popover-preview').then(m => ({ default: m.PopoverPreview })),
  tooltip: () => import('./tooltip-preview').then(m => ({ default: m.TooltipPreview })),
  'hover-card': () => import('./hover-card-preview').then(m => ({ default: m.HoverCardPreview })),
  'radio-group': () => import('./radio-group-preview').then(m => ({ default: m.RadioGroupPreview })),
  toggle: () => import('./toggle-preview').then(m => ({ default: m.TogglePreview })),
  'toggle-group': () => import('./toggle-group-preview').then(m => ({ default: m.ToggleGroupPreview })),
  collapsible: () => import('./collapsible-preview').then(m => ({ default: m.CollapsiblePreview })),
  skeleton: () => import('./skeleton-preview').then(m => ({ default: m.SkeletonPreview })),
  slider: () => import('./slider-preview').then(m => ({ default: m.SliderPreview })),
  table: () => import('./table-preview').then(m => ({ default: m.TablePreview })),
  icon: () => import('./icon-preview').then(m => ({ default: m.IconPreview })),
  'theme-toggle': () => import('./theme-toggle-preview').then(m => ({ default: m.ThemeTogglePreview })),
  toast: () => import('./toast-preview').then(m => ({ default: m.ToastPreview })),
  chart: () => import('./chart-preview').then(m => ({ default: m.ChartPreview })),
  'glass-view': () => import('./glass-view-preview').then(m => ({ default: m.GlassViewPreview })),
  'aspect-ratio': () => import('./aspect-ratio-preview').then(m => ({ default: m.AspectRatioPreview })),
};
