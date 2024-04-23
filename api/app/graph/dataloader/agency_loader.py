from app.models import Agency
from aiodataloader import DataLoader

class AgencyLoader(DataLoader):
    async def batch_load_fn(self, keys):
        agencies = Agency.query.filter(Agency.id.in_(keys)).all()
        agency_map = {agency.id: agency for agency in agencies}
        return [agency_map.get(agency_id) for agency_id in keys]
