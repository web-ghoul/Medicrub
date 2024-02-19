export const handleDateForInput=(date)=>{
  return new Date(date).toISOString().split("T")[0]
}