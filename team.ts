const TEAM_SHEET_NAME = "Info-Team";
const TEAM_SIZE = 20;

type TeamStatus = "FREE" | "BLOCK";

interface TeamRecord {
  name: string;
  point: string[];
  score: number;
  status: "FREE" | "BLOCK";
  message: string | null;
  contact: string | null;
}

const parseTeamRecord = (record: string[]): TeamRecord => ({
  name: record[0],
  point: record[1].split(","),
  score: parseInt(record[2]),
  status: record[3] as TeamStatus,
  message: record[4],
  contact: record[5],
});

const getTeam = (team: string): TeamRecord => {
  const sheet = SpreadsheetApp.getActive().getSheetByName(TEAM_SHEET_NAME);

  let teamIndex = sheet
    ?.getRange(1, 1, TEAM_SIZE, sheet.getLastColumn())
    .getValues()
    .findIndex((it) => it[0] == team);

  if (!!teamIndex && teamIndex > 0) {
    teamIndex += 1; // offset start from 1
  } else {
    throw new Error("Team not found");
  }

  return parseTeamRecord(
    sheet
      ?.getRange(teamIndex, 1, 1, sheet.getLastColumn())
      .getValues()[0] as string[]
  );
};
