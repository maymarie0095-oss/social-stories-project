const stories = {
  dentist: [
    "{name} is going to the dentist today.",
    "The dentist helps keep {possessive} teeth clean and healthy.",
    "The dentist may use a special toothbrush to clean {possessive} teeth.",
    "The dentist may use a small mirror to look inside {possessive} mouth.",
    "The dentist may count all of {possessive} teeth.",
    "Some tools may make sounds. The sounds may be new, but {name} is safe.",
    "If {name} feels nervous, {subject} can take a deep breath or hold {caregiver}'s hand.",
    "When the dentist is finished, {name} will be all done.",
    "Then {name} and {caregiver} can go home."
  ]
};

function getPronouns(type) {
  if (type === "he") {
    return { subject: "he", object: "him", possessive: "his" };
  }

  if (type === "she") {
    return { subject: "she", object: "her", possessive: "her" };
  }

  return { subject: "they", object: "them", possessive: "their" };
}

function fillTemplate(sentence, character) {
  const pronouns = getPronouns(character.pronouns);

  return sentence
    .replaceAll("{name}", character.name)
    .replaceAll("{subject}", pronouns.subject)
    .replaceAll("{object}", pronouns.object)
    .replaceAll("{possessive}", pronouns.possessive)
    .replaceAll("{caregiver}", character.caregiver);
}