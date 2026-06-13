const ACTIVITIES = {
    "Course à pied" : "Run",
    "Course Tapis/Salle" : "Indoor Run",
    "Trail" : "Trail Run",
    "Vélo" : "Bike",
    "Home trainer" : "Indoor Bike",
    "Run" : "Run",
    "Indoor Run" : "Indoor Run",
    "Trail Run" : "Trail Run",
    "Bike" : "Bike",
    "Indor Bike" : "Indoor Bike"
};

const formatDate = date => {
  if(!(/^\d{2}-\d{2}-\d{4}-\d{2}-\d{2}$/).test(date)) return [false];

  const [day, month, year, hours, minute] = date.split("-").map(x => Number(x));
  const dateTyped = new Date(year,month-1, day, hours, minute);
  
  //bisstextile error handle + odd 31 days
  if(dateTyped.getMonth() + 1 !== month) return [false];

  const formatedDate = dateTyped.toISOString();

  return [true, formatedDate];
};

const isThereEmptyParameter = parameters => parameters.filter(x => x === null || x === undefined || x.length === 0).length;

const generateTcxPattern = (activityFrench, date, duration, distance, calories) => {
    try {
      if(isThereEmptyParameter([activityFrench, date, duration, distance, calories]) > 0) throw new Error("EmptyField");

      const activity = ACTIVITIES[activityFrench];

      if(activity === undefined || activity === null) throw new Error("UnKnownActivity");

      const formatedDate = formatDate(date);

      if(!formatedDate || formatedDate.length < 2) throw new Error("InvalidDate");
      if((/[^\d]/g).test(`${duration}${distance}${calories}`)) throw new Error("ErrorInDistanceDurationCalories");

      return `<TrainingCenterDatabase xmlns="http://www.garmin.com/xmlschemas/TrainingCenterDatabase/v2">
  <Activities>
    <Activity Sport="${activity}">
      <Id>${formatedDate[1].replace(/[^A-Z0-9\-\:\.]/g, "")}</Id>
      <Lap StartTime="${formatedDate[1].replace(/[^A-Z0-9\-\:\.]/g, "")}">
        <TotalTimeSeconds>${duration.replace("[^\d]", "")}</TotalTimeSeconds>
        <DistanceMeters>${distance.replace("[^\d]", "")}</DistanceMeters>
        <Calories>${calories.replace("[^\d]", "")}</Calories>
        <Intensity>Active</Intensity>
        <TriggerMethod>Manual</TriggerMethod>
      </Lap>
    </Activity>
  </Activities>
</TrainingCenterDatabase>`;
    }
    catch(e) { 
      return `${e}`;
    }
};

export default generateTcxPattern;