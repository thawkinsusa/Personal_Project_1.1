select users.*,
teams.*,
heroes.*
from users
    JOIN team_junction on(users.id = team_junction.user_id)
    JOIN teams on(teams.id = team_junction.team_id)
    Join heroes on(heroes.id=team_junction.hero_id)
where users.id = $1;