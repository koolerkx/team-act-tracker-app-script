const RECORD_SHEET_NAME = "CheckRecord";
const RECORD_SIZE = 2000;

interface PointRecord {
  point: string;
  team: string;
  checkIn: Date;
  checkOut: Date | null;
}

const checkInPoint = (point: string, team: string) => {
  if (getTeam(team).status == "BLOCK") {
    Logger.log("Team is blocked: ", team);
    return;
  }

  try {
    checkOutPoint(point);
  } catch (e: unknown) {
    console.log("Error", e);
  }

  const sheet = SpreadsheetApp.getActive().getSheetByName(RECORD_SHEET_NAME);
  // Only retrieve the first column
  const pointColumnRange = sheet?.getRange(1, 1, RECORD_SIZE, 1);

  const rowIndex =
    (pointColumnRange?.getValues().findIndex((it) => it[0] == "") ?? 0) + 1;

  if (rowIndex <= 0) {
    throw new Error("First row not found");
  }

  // Append record with current datetime
  const range = sheet?.getRange(rowIndex, 1, 1, 4);
  range?.setValues([[point, team, new Date().toISOString(), ""]]);
};

const checkOutPoint = (point: string) => {
  const sheet = SpreadsheetApp.getActive().getSheetByName(RECORD_SHEET_NAME);

  const rowIndex = sheet
    ?.createTextFinder(point)
    .matchEntireCell(true)
    .findPrevious()
    ?.getRowIndex();

  if (!rowIndex) {
    throw new Error("Point previous check in record not found");
  }

  // Fill in check out time with current datetime
  const range = sheet?.getRange(rowIndex, 1, 1, 4);
  range?.getCell(1, 4).setValue(new Date().toISOString());
};
