from app.models import AgencyUser
from aiodataloader import DataLoader

class AgencyUserLoader(DataLoader):
    async def batch_load_fn(self, keys):
        agency_users = AgencyUser.query.filter(AgencyUser.user_id.in_(keys)).all()
        agency_users_map = {agency.user_id: agency for agency in agency_users}
        return [agency_users_map.get(agency_id) for agency_id in keys]
