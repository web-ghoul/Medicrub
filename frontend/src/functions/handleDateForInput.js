export const handleDateForInput=(date)=>{
  if(date && date instanceof Date){
    return new Date(date).toISOString().split("T")[0]
  }
  return ""
}