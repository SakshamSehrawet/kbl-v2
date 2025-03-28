export default function AboutPage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">About KUCHBHI IPL 2025 DREAM11 LEAGUE</h1>

      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-3">Our Fantasy League</h2>
          <p className="text-muted-foreground">
            Welcome to the KUCHBHI IPL 2025 DREAM11 LEAGUE! This is a friendly fantasy cricket competition where
            participants create their Dream11 teams for IPL matches and compete against each other throughout the
            tournament.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">How It Works</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>Participants create their Dream11 teams for each IPL match</li>
            <li>Points are awarded based on the performance of selected players</li>
            <li>The leaderboard is updated after each match</li>
            <li>The participant with the most points at the end of the tournament wins!</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Rules</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Teams must be submitted before the match deadline</li>
            <li>No changes are allowed after the deadline</li>
            <li>Points are calculated based on official Dream11 scoring system</li>
            <li>In case of a tie, the participant with more top-3 finishes wins</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Contact</h2>
          <p className="text-muted-foreground">
            For any questions or concerns, please contact the league administrator.
          </p>
        </section>
      </div>
    </div>
  )
}

