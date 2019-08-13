module.exports = {
    create: async (req, res, next) => {
        const dbInstance = req.app.get('db');
        const { team_name, team_image, team_creation_date, id } = req.body
        const teamId = await dbInstance.create_team_first([team_name, team_image, team_creation_date])
        await dbInstance.create_team_second(id, teamId[0].id)
        const data = await dbInstance.create_team_third_join(id)
        res.status(200).send(data)

    },
    getTeam: (req, res, next) => {
        const dbInstance = req.app.get('db');
        dbInstance.get_team_by_user_id(req.params.id)
            .then(team => {
                res.status(200).send(team)
            })
            .catch(err => {
                res.status(500).send({ errorMessage: "get team is broken !@#$" });
                console.log(err)
            });
    },

    getTeamMembers: async (req, res, next) => {
        const dbInstance = req.app.get('db');
        const { id } = req.params
        dbInstance.read_teamMembers(req.params.id)
            .then(team => {
                res.status(200).send(team)
            })
            .catch(err => {
                res.status(500).send({ errorMessage: "get team is broken !@#$" });
                console.log(err)
            });
    },

    getAllTeams: (req, res, next) => {
        const dbInstance = req.app.get('db');

        dbInstance.read_teams()
            .then(teams => res.status(200).send(teams))
            .catch(err => {
                res.status(500).send({ errorMessage: "getAllTeams is broken !@#$" });
                console.log(err)
            });
    },

    async deleteTeamMember(req, res) {
        let { userId } = req.params;
        let { teamId } = req.query
        const db = req.app.get('db');
        let teamMember = await db.delete_team_member([
            +userId,
            +teamId,
        ]);
        console.log(teamMember)
        res.send(teamMember);
    },
    async addTeamMember(req, res) {
        let { userId, teamId } = req.body;
        const db = req.app.get('db');
        let teamMember = await db.add_team_member([
            userId,
            +teamId,
        ]);
        res.send(teamMember);
    },
    async logoutTeam(req, res) {
        req.session.destroy();
        res.sendStatus(200);
    },
}