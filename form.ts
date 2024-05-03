const FORM_QUESTION_KEY = {
  team: "你的隊伍是？",
  datetime: "時間戳記",
} as const;

interface OnPointFormSubmit extends GoogleAppsScript.Events.SheetsOnFormSubmit {
  namedValues: Record<
    (typeof FORM_QUESTION_KEY)[keyof typeof FORM_QUESTION_KEY],
    string[]
  >;
}

const sheetNameToPointMap = {
  "Form-A": "A",
  "Form-B": "B",
  "Form-C": "C",
};

const onPointFormSubmit = (e: OnPointFormSubmit) => {
  const sheet = SpreadsheetApp.getActiveSheet();

  if (!e.namedValues[FORM_QUESTION_KEY.team][0]) {
    throw new Error("Form Value Error");
  }

  checkInPoint(
    sheetNameToPointMap[sheet.getName()],
    e.namedValues[FORM_QUESTION_KEY.team][0]
  );
};
