insert into teams(team_name, team_image, team_creation_date)
values($1, $2, $3)

returning *
