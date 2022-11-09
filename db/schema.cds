namespace sap.test.products;

using{
    Currency,
    cuid,
    managed,
    sap.common.CodeList

}
from '@sap/cds/common';

entity Products : cuid, managed{
   key ID : Integer;
    title : String(111);
    stock: Integer;
    price: Decimal(9,2);
   // currency: Currency;
    //category: Association to Categories;

}

entity Categories : CodeList {
    key ID: Integer;
    parent: Association to Categories;
    child: Association to many Categories on child .parent = $self;

}