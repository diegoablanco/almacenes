module.exports = `
    select format(sam.date, 'dd/MM/yyyy', 'en-US') as Fecha, p.code as IMEI, pt.description as Descripción, pt.ean as EAN
    from products p
    join [dbo].[stockAccountMovements] sam on p.stockAccountMovementId = sam.id
    join [dbo].[productTypes] pt on p.typeId = pt.id
    where sam.type = 'receive'
    order by sam.date, pt.description
`
