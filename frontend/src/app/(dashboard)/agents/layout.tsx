import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Agent Conversation | Sandbay AI',
  description: 'Interactive agent conversation powered by Sandbay AI',
  openGraph: {
    title: 'Agent Conversation | Sandbay AI',
    description: 'Interactive agent conversation powered by Sandbay AI',
    type: 'website',
  },
};

export default function AgentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
