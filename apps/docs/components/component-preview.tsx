'use client';

import dynamic from 'next/dynamic';
import { PreviewCard } from './preview-card';
import * as React from 'react';

const previewComponents: Record<string, React.ComponentType> = {
  button: dynamic(() => import('./previews/button-preview').then(m => m.ButtonPreview as any)),
  text: dynamic(() => import('./previews/text-preview').then(m => m.TextPreview as any)),
  badge: dynamic(() => import('./previews/badge-preview').then(m => m.BadgePreview as any)),
  card: dynamic(() => import('./previews/card-preview').then(m => m.CardPreview as any)),
  input: dynamic(() => import('./previews/input-preview').then(m => m.InputPreview as any)),
  textarea: dynamic(() => import('./previews/textarea-preview').then(m => m.TextareaPreview as any)),
  label: dynamic(() => import('./previews/label-preview').then(m => m.LabelPreview as any)),
  separator: dynamic(() => import('./previews/separator-preview').then(m => m.SeparatorPreview as any)),
  switch: dynamic(() => import('./previews/switch-preview').then(m => m.SwitchPreview as any)),
  checkbox: dynamic(() => import('./previews/checkbox-preview').then(m => m.CheckboxPreview as any)),
  progress: dynamic(() => import('./previews/progress-preview').then(m => m.ProgressPreview as any)),
  avatar: dynamic(() => import('./previews/avatar-preview').then(m => m.AvatarPreview as any)),
  tabs: dynamic(() => import('./previews/tabs-preview').then(m => m.TabsPreview as any)),
  accordion: dynamic(() => import('./previews/accordion-preview').then(m => m.AccordionPreview as any)),
  alert: dynamic(() => import('./previews/alert-preview').then(m => m.AlertPreview as any)),
  dialog: dynamic(() => import('./previews/dialog-preview').then(m => m.DialogPreview as any)),
  'alert-dialog': dynamic(() => import('./previews/alert-dialog-preview').then(m => m.AlertDialogPreview as any)),
  select: dynamic(() => import('./previews/select-preview').then(m => m.SelectPreview as any)),
  'dropdown-menu': dynamic(() => import('./previews/dropdown-menu-preview').then(m => m.DropdownMenuPreview as any)),
  'context-menu': dynamic(() => import('./previews/context-menu-preview').then(m => m.ContextMenuPreview as any)),
  menubar: dynamic(() => import('./previews/menubar-preview').then(m => m.MenubarPreview as any)),
  popover: dynamic(() => import('./previews/popover-preview').then(m => m.PopoverPreview as any)),
  tooltip: dynamic(() => import('./previews/tooltip-preview').then(m => m.TooltipPreview as any)),
  'hover-card': dynamic(() => import('./previews/hover-card-preview').then(m => m.HoverCardPreview as any)),
  'radio-group': dynamic(() => import('./previews/radio-group-preview').then(m => m.RadioGroupPreview as any)),
  toggle: dynamic(() => import('./previews/toggle-preview').then(m => m.TogglePreview as any)),
  'toggle-group': dynamic(() => import('./previews/toggle-group-preview').then(m => m.ToggleGroupPreview as any)),
  collapsible: dynamic(() => import('./previews/collapsible-preview').then(m => m.CollapsiblePreview as any)),
  skeleton: dynamic(() => import('./previews/skeleton-preview').then(m => m.SkeletonPreview as any)),
  slider: dynamic(() => import('./previews/slider-preview').then(m => m.SliderPreview as any)),
  table: dynamic(() => import('./previews/table-preview').then(m => m.TablePreview as any)),
  icon: dynamic(() => import('./previews/icon-preview').then(m => m.IconPreview as any)),
  'theme-toggle': dynamic(() => import('./previews/theme-toggle-preview').then(m => m.ThemeTogglePreview as any)),
  toast: dynamic(() => import('./previews/toast-preview').then(m => m.ToastPreview as any)),
  chart: dynamic(() => import('./previews/chart-preview').then(m => m.ChartPreview as any)),
  'glass-view': dynamic(() => import('./previews/glass-view-preview').then(m => m.GlassViewPreview as any)),
  'aspect-ratio': dynamic(() => import('./previews/aspect-ratio-preview').then(m => m.AspectRatioPreview as any)),
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
