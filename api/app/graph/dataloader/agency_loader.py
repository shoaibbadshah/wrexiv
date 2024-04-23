from promise import Promise
from promise.dataloader import DataLoader

from app.models import Agency


class AgencyLoader(DataLoader):
    def batch_load_fn(self, keys):
        agencies = Agency.query.filter(Agency.id.in_(keys)).all()
        agency_map = {agency.id: agency for agency in agencies}
        return Promise.resolve([agency_map.get(agency_id) for agency_id in keys])
    
    def get_key_from_object(self, obj):
        return obj.id
    
    def get_key_from_key(self, key):
        return key
    
    def get_object_from_key(self, key):
        return Agency.query.get(key)
