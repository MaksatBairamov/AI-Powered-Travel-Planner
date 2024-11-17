import { Document, Packer, Paragraph, TextRun } from "docx";

export const exportTripsToDocx = (trips) => {
  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: "Planned Trips",
                bold: true,
                size: 28,
              }),
            ],
          }),
          ...trips.map(
            (trip) =>
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Destination: ${trip.destination}`,
                    bold: true,
                    size: 24,
                  }),
                  new TextRun({ text: `\nBudget: ${trip.budget}`, size: 24 }),
                ],
              })
          ),
        ],
      },
    ],
  });

  Packer.toBlob(doc).then((blob) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "planned_trips.docx";
    link.click();
    URL.revokeObjectURL(url);
  });
};
