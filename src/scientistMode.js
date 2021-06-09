import BibTexParser from "bib2json";

const scientistMode = (bibTexData) => {
  const pubData = BibTexParser(bibTexData);

  return pubData.entries.sort(
    (pub1, pub2) => parseInt(pub2.Fields.year) - parseInt(pub1.Fields.year),
  );
};

export default scientistMode;
