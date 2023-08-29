export const formatDateToDDMM = (dateString: string) => {
  const date = new Date(dateString)
  const formatter = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit"
  })
  return formatter.format(date)
}

export const formatCurrency = (value: number) => {
  const numberFormatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  })
  return numberFormatter.format(value)
}
