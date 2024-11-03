import React, { cloneElement, isValidElement } from 'react';

interface TabsProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
}

interface TabsListProps {
  children: React.ReactNode;
  value: string;
  onValueChange: (value: string) => void;
}

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  isSelected?: boolean;
  onClick?: () => void;
}

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
}

export function Tabs({ value, onValueChange, children }: TabsProps) {
  return (
    <div className="space-y-4">
      {React.Children.map(children, (child) => {
        if (isValidElement(child)) {
          return cloneElement(child, {
            value,
            onValueChange
          });
        }
        return child;
      })}
    </div>
  );
}

export function TabsList({ children, value, onValueChange }: TabsListProps) {
  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-8" aria-label="Tabs">
        {React.Children.map(children, (child) => {
          if (isValidElement(child)) {
            return cloneElement(child, {
              isSelected: child.props.value === value,
              onClick: () => onValueChange(child.props.value)
            });
          }
          return child;
        })}
      </nav>
    </div>
  );
}

export function TabsTrigger({ value, children, isSelected, onClick }: TabsTriggerProps) {
  return (
    <button
      onClick={onClick}
      className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
        isSelected
          ? 'border-indigo-500 text-indigo-600'
          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
      }`}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value: currentValue, value: tabValue, children }: TabsContentProps & { value: string }) {
  if (currentValue !== tabValue) return null;
  return <div className="mt-6">{children}</div>;
}