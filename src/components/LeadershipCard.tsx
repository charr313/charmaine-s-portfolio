interface LeadershipCardProps {
  title: string;
  year: string;
  description: string;
}

export default function LeadershipCard({ title, year, description }: LeadershipCardProps) {
  return (
    <div className="bg-card rounded-xl p-6 border-2 border-accent transition-transform hover:scale-[1.02]">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-sm font-medium text-gray-700 mb-3">{year}</p>
      <p className="text-base">{description}</p>
    </div>
  );
}
