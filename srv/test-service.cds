using {sap.test.products as db} from '../db/schema';

@requires : 'authenticated-user'
@cds.query.limit.max: 10000000

service testService{
    entity Products as projection on db.Products;
    entity Categories as projection on db.Categories;
}