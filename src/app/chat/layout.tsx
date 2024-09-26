interface ChatLayoutProps {
  children: React.ReactNode;
}

export default async function ChatLayout({ children }: ChatLayoutProps) {
  return (
    <div className="relative flex flex-1 overflow-hidden ">{children}</div>
  );
}
