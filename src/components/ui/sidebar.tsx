import * as React from "react";

interface SidebarProviderProps {
  children: React.ReactNode;
  defaultOpen?: boolean;
}

interface SidebarProps {
  children: React.ReactNode;
  variant?: "inset" | "full" | "compact"; // Specific variants
  collapsible?: boolean;
  className?: string;
}

interface SidebarMenuButtonProps {
  children: React.ReactNode;
  isActive?: boolean;
  tooltip?: string;
  asChild?: boolean;
  onClick?: () => void;
}

export const SidebarProvider: React.FC<SidebarProviderProps> = ({ 
  children, 
  defaultOpen = false 
}) => {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);
  
  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </SidebarContext.Provider>
  );
};

const SidebarContext = React.createContext<{
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}>({
  isOpen: false,
  setIsOpen: () => {},
});

export const Sidebar: React.FC<SidebarProps> = ({ 
  children, 
  variant = "full", 
  collapsible = false,
  className = ""
}) => {
  const { isOpen } = React.useContext(SidebarContext);
  
  const variantClasses = {
    inset: "ml-16 w-48",
    full: "w-64",
    compact: "w-20"
  };

  return (
    <aside 
      className={`bg-white border-r transition-all duration-300 ${
        variantClasses[variant]
      } ${className} ${
        collapsible ? (isOpen ? "translate-x-0" : "-translate-x-full") : ""
      }`}
    >
      {children}
    </aside>
  );
};

export const SidebarHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="p-4 border-b flex items-center justify-between">{children}</div>;
};

export const SidebarContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="p-4">{children}</div>;
};

export const SidebarFooter: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="p-4 border-t">{children}</div>;
};

export const SidebarTrigger: React.FC = () => {
  const { isOpen, setIsOpen } = React.useContext(SidebarContext);
  
  return (
    <button 
      className="p-2 bg-emerald-500 text-white rounded hover:bg-emerald-600 transition-colors"
      onClick={() => setIsOpen(!isOpen)}
    >
      {isOpen ? "Collapse" : "Expand"}
    </button>
  );
};

export const SidebarMenu: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <ul className="space-y-2">{children}</ul>;
};

export const SidebarMenuItem: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <li>{children}</li>;
};

export const SidebarMenuButton: React.FC<SidebarMenuButtonProps> = ({
  children,
  isActive = false,
  tooltip,
  asChild = false,
  onClick,
}) => {
  return (
    <button
      className={`flex items-center gap-2 w-full text-left p-2 rounded transition-colors ${
        isActive ? "bg-emerald-100 text-emerald-700" : "hover:bg-gray-100"
      }`}
      title={tooltip}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export const SidebarSeparator: React.FC = () => {
  return <hr className="my-4 border-gray-200" />;
};

// Compound component export
export const SidebarCompound = {
  Provider: SidebarProvider,
  Root: Sidebar,
  Header: SidebarHeader,
  Content: SidebarContent,
  Footer: SidebarFooter,
  Trigger: SidebarTrigger,
  Menu: SidebarMenu,
  Item: SidebarMenuItem,
  Button: SidebarMenuButton,
  Separator: SidebarSeparator,
};