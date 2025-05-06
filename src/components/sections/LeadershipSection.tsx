import LeadershipCard from "@/components/LeadershipCard";

export default function LeadershipSection() {
  const leadershipRoles = [
    {
      title: "Class Vice-Chairperson",
      year: "'22",
      description: "Assisted the chairperson in organizing class activities and represented class interests"
    },
    {
      title: "Active Citizenship Leader",
      year: "'23 - '25",
      description: "Led community service initiatives and promoted civic responsibility among peers"
    },
    {
      title: "Dance Vice-Chairperson",
      year: "'24 - '25",
      description: "Support the dance team with choreography and event organization"
    }
  ];

  return (
    <section id="leadership" className="mb-16 min-h-[50vh]">
      <h2 className="section-title text-2xl font-semibold mb-10 mt-5 tracking-wider">LEADERSHIP</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {leadershipRoles.map((role, index) => (
          <LeadershipCard 
            key={index}
            title={role.title}
            year={role.year}
            description={role.description}
          />
        ))}
      </div>
    </section>
  );
}
