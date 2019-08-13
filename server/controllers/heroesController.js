module.exports = {
    // duplicate
    getHeroesTeamByUserId: (req, res, next) => {
        const dbInstance = req.app.get('db');
        console.log('hit get team');
        dbInstance.read_team_by_user_id_heroes(req.params.id)
            .then(team => {
                res.status(200).send(team)
            })
            .catch(err => {
                res.status(500).send({ errorMessage: "get team is broken !@#$" });
                console.log(err)
            });
    },

    getHeroesById: async (req, res, next) => {
        const dbInstance = req.app.get('db');
        const { id } = req.params
        console.log('user id for teammembers', req.params.id);
        dbInstance.read_team_by_user_id_heroes(req.params.id)
            .then(hero => {
                res.status(200).send(hero)
            })
            .catch(err => {
                res.status(500).send({ errorMessage: "get hero by id is broken !@#$" });
                console.log(err)
            });
    },

    getAllHeroes: (req, res, next) => {
        const dbInstance = req.app.get('db');

        dbInstance.get_all_heroes()
            .then(heroes => res.status(200).send(heroes))
            .catch(err => {
                res.status(500).send({ errorMessage: "getHeroes is broken !@#$" });
                console.log(err)
            });
    },

    async deleteTeamHero(req, res) {
        let { heroId } = req.params;
        let { teamId } = req.query
        console.log('delete hero log', heroId, teamId);
        const db = req.app.get('db');
        let teamHero = await db.delete_team_hero([
            +heroId,
            +teamId,
        ]);
        console.log(teamHero)
        res.send(teamHero);
    },
    async addTeamHero(req, res) {
        let { userId, teamId, heroId } = req.body;
        console.log('add hero member log', userId, teamId, heroId);
        const db = req.app.get('db');
        let teamMember = await db.add_team_member([
            +userId,
            +teamId,
            +heroId
        ]);

        res.send(teamMember);
    },
    async logoutHero(req, res) {
        req.session.destroy();
        res.sendStatus(200);
    },
}