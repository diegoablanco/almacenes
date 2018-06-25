module.exports = `
    select format(sam.date, 'dd/MM/yyyy', 'en-US') as Fecha, sam.receipt as Albarán, p.code as IMEI, pt.ean as EAN, pt.description as Descripción
    from products p
    join [dbo].[stockAccountMovements] sam on p.stockAccountMovementId = sam.id
    join [dbo].[productTypes] pt on p.typeId = pt.id
    where sam.type = 'issue'
    order by sam.date, pt.description
`
