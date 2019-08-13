    
insert into team_junction(user_id, team_id, hero_id)
VALUES($1, $2, $3);

SELECT
heroes.*
FROM heroes
join team_junction on(heroes.id = team_junction.hero_id)
where team_junction.team_id = $2;