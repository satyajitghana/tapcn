'use client';

import dynamic from 'next/dynamic';
import { PreviewCard } from './preview-card';
import * as React from 'react';

const previewComponents: Record<string, React.ComponentType> = {
  accordion: dynamic(() => import('./previews/accordion-preview').then(m => m.AccordionPreview as any)),
  'action-sheet': dynamic(() => import('./previews/action-sheet-preview').then(m => m.ActionSheetPreview as any)),
  alert: dynamic(() => import('./previews/alert-preview').then(m => m.AlertPreview as any)),
  'alert-dialog': dynamic(() => import('./previews/alert-dialog-preview').then(m => m.AlertDialogPreview as any)),
  'aspect-ratio': dynamic(() => import('./previews/aspect-ratio-preview').then(m => m.AspectRatioPreview as any)),
  avatar: dynamic(() => import('./previews/avatar-preview').then(m => m.AvatarPreview as any)),
  'avatar-group': dynamic(() => import('./previews/avatar-group-preview').then(m => m.AvatarGroupPreview as any)),
  badge: dynamic(() => import('./previews/badge-preview').then(m => m.BadgePreview as any)),
  'badge-indicator': dynamic(() => import('./previews/badge-indicator-preview').then(m => m.BadgeIndicatorPreview as any)),
  banner: dynamic(() => import('./previews/banner-preview').then(m => m.BannerPreview as any)),
  'bottom-bar': dynamic(() => import('./previews/bottom-bar-preview').then(m => m.BottomBarPreview as any)),
  'bottom-sheet': dynamic(() => import('./previews/bottom-sheet-preview').then(m => m.BottomSheetPreview as any)),
  button: dynamic(() => import('./previews/button-preview').then(m => m.ButtonPreview as any)),
  card: dynamic(() => import('./previews/card-preview').then(m => m.CardPreview as any)),
  carousel: dynamic(() => import('./previews/carousel-preview').then(m => m.CarouselPreview as any)),
  chart: dynamic(() => import('./previews/chart-preview').then(m => m.ChartPreview as any)),
  checkbox: dynamic(() => import('./previews/checkbox-preview').then(m => m.CheckboxPreview as any)),
  chip: dynamic(() => import('./previews/chip-preview').then(m => m.ChipPreview as any)),
  collapsible: dynamic(() => import('./previews/collapsible-preview').then(m => m.CollapsiblePreview as any)),
  'context-menu': dynamic(() => import('./previews/context-menu-preview').then(m => m.ContextMenuPreview as any)),
  dialog: dynamic(() => import('./previews/dialog-preview').then(m => m.DialogPreview as any)),
  'divider-with-label': dynamic(() => import('./previews/divider-with-label-preview').then(m => m.DividerWithLabelPreview as any)),
  'dropdown-menu': dynamic(() => import('./previews/dropdown-menu-preview').then(m => m.DropdownMenuPreview as any)),
  'empty-state': dynamic(() => import('./previews/empty-state-preview').then(m => m.EmptyStatePreview as any)),
  'expandable-text': dynamic(() => import('./previews/expandable-text-preview').then(m => m.ExpandableTextPreview as any)),
  fab: dynamic(() => import('./previews/fab-preview').then(m => m.FABPreview as any)),
  'glass-view': dynamic(() => import('./previews/glass-view-preview').then(m => m.GlassViewPreview as any)),
  'hover-card': dynamic(() => import('./previews/hover-card-preview').then(m => m.HoverCardPreview as any)),
  icon: dynamic(() => import('./previews/icon-preview').then(m => m.IconPreview as any)),
  input: dynamic(() => import('./previews/input-preview').then(m => m.InputPreview as any)),
  label: dynamic(() => import('./previews/label-preview').then(m => m.LabelPreview as any)),
  'list-item': dynamic(() => import('./previews/list-item-preview').then(m => m.ListItemPreview as any)),
  menubar: dynamic(() => import('./previews/menubar-preview').then(m => m.MenubarPreview as any)),
  'notification-item': dynamic(() => import('./previews/notification-item-preview').then(m => m.NotificationItemPreview as any)),
  'otp-input': dynamic(() => import('./previews/otp-input-preview').then(m => m.OTPInputPreview as any)),
  'page-indicator': dynamic(() => import('./previews/page-indicator-preview').then(m => m.PageIndicatorPreview as any)),
  'phone-input': dynamic(() => import('./previews/phone-input-preview').then(m => m.PhoneInputPreview as any)),
  popover: dynamic(() => import('./previews/popover-preview').then(m => m.PopoverPreview as any)),
  progress: dynamic(() => import('./previews/progress-preview').then(m => m.ProgressPreview as any)),
  'radio-group': dynamic(() => import('./previews/radio-group-preview').then(m => m.RadioGroupPreview as any)),
  rating: dynamic(() => import('./previews/rating-preview').then(m => m.RatingPreview as any)),
  'search-bar': dynamic(() => import('./previews/search-bar-preview').then(m => m.SearchBarPreview as any)),
  'segmented-control': dynamic(() => import('./previews/segmented-control-preview').then(m => m.SegmentedControlPreview as any)),
  select: dynamic(() => import('./previews/select-preview').then(m => m.SelectPreview as any)),
  separator: dynamic(() => import('./previews/separator-preview').then(m => m.SeparatorPreview as any)),
  skeleton: dynamic(() => import('./previews/skeleton-preview').then(m => m.SkeletonPreview as any)),
  'slide-to-action': dynamic(() => import('./previews/slide-to-action-preview').then(m => m.SlideToActionPreview as any)),
  slider: dynamic(() => import('./previews/slider-preview').then(m => m.SliderPreview as any)),
  snackbar: dynamic(() => import('./previews/snackbar-preview').then(m => m.SnackbarPreview as any)),
  'speed-dial': dynamic(() => import('./previews/speed-dial-preview').then(m => m.SpeedDialPreview as any)),
  'status-indicator': dynamic(() => import('./previews/status-indicator-preview').then(m => m.StatusIndicatorPreview as any)),
  stepper: dynamic(() => import('./previews/stepper-preview').then(m => m.StepperPreview as any)),
  'swipeable-row': dynamic(() => import('./previews/swipeable-row-preview').then(m => m.SwipeableRowPreview as any)),
  switch: dynamic(() => import('./previews/switch-preview').then(m => m.SwitchPreview as any)),
  table: dynamic(() => import('./previews/table-preview').then(m => m.TablePreview as any)),
  tabs: dynamic(() => import('./previews/tabs-preview').then(m => m.TabsPreview as any)),
  'tag-input': dynamic(() => import('./previews/tag-input-preview').then(m => m.TagInputPreview as any)),
  text: dynamic(() => import('./previews/text-preview').then(m => m.TextPreview as any)),
  textarea: dynamic(() => import('./previews/textarea-preview').then(m => m.TextareaPreview as any)),
  'theme-toggle': dynamic(() => import('./previews/theme-toggle-preview').then(m => m.ThemeTogglePreview as any)),
  timeline: dynamic(() => import('./previews/timeline-preview').then(m => m.TimelinePreview as any)),
  toast: dynamic(() => import('./previews/toast-preview').then(m => m.ToastPreview as any)),
  toggle: dynamic(() => import('./previews/toggle-preview').then(m => m.TogglePreview as any)),
  'toggle-group': dynamic(() => import('./previews/toggle-group-preview').then(m => m.ToggleGroupPreview as any)),
  tooltip: dynamic(() => import('./previews/tooltip-preview').then(m => m.TooltipPreview as any)),
};

export function ComponentPreview({
  component,
  code,
  highlightedCode,
}: {
  component: string;
  code?: string;
  highlightedCode?: string;
}) {
  const Preview = previewComponents[component];
  if (!Preview) return null;

  return <PreviewCard preview={<Preview />} code={code} highlightedCode={highlightedCode} componentName={component} />;
}
