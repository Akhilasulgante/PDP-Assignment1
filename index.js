let prompt = require("prompt-sync")();

class Publication {
  title;
  category;
  year = new Date().getYear();

  constructor(title, year, category) {
    if (!title || !year || !category) {
      throw new Error(
        "I need a title, year and category to create a publication"
      );
    }

    this.title = title;
    this.year = year !== undefined ? year : this.year;
    this.category = category;
  }

  isPublication() {
    return (
      this.title !== undefined &&
      this.year !== undefined &&
      this.category !== undefined
    );
  }
}

class Book extends Publication {
  publisher;
  author;
  constructor(title, author, year, publisher, category) {
    if (!publisher || !author) {
      throw new Error("I need a publisher & author to create a book");
    }

    super(title, year, category);

    this.publisher = publisher;
    this.author = author;
  }

  isBook() {
    return (
      this.isPublication() &&
      this.publisher !== undefined &&
      this.author !== undefined
    );
  }

  citeAPA() {
    return `${this.author} (${this.year}). ${this.title}. ${this.publisher} `;
  }

  citeMLA() {
    return `${this.author}. ${this.title}. ${this.publisher}. ${this.year}`;
  }
}

class Paper extends Publication {
  journal;
  volume;
  author;

  constructor(title, author, year, journal, volume, category) {
    if (!journal || !volume || !author) {
      throw new Error("I need an journal, volume and author to create a paper");
    }

    super(title, year, category);
    this.journal = journal;
    this.volume = volume;
    this.author = author;
  }

  isPaper() {
    return (
      this.isPublication() &&
      this.journal !== undefined &&
      this.volume !== undefined &&
      this.author !== undefined
    );
  }

  citeAPA() {
    return `${this.author} (${this.year}). ${this.title}. ${this.journal} : ${this.volume} `;
  }

  citeMLA() {
    return `${this.author}. ${this.title}. ${this.journal} : ${this.volume}. ${this.year}`;
  }
}

class Website extends Publication {
  url;
  constructor(title, year, url, category) {
    if (!url) {
      throw new Error("I need a url to create a website");
    }

    super(title, year, category);

    this.url = url;
  }

  isWebsite() {
    return this.isPublication() && this.url !== undefined;
  }

  citeAPA() {
    return `${this.title} (${this.year}). ${this.url} `;
  }

  citeMLA() {
    return `${this.title}. ${this.url}. ${this.year}`;
  }
}

class PublicationManager {
  publications = [];

  addPaper(title, author, year, journal, volume, category) {
    this.publications.push(
      new Paper(title, author, year, journal, volume, category)
    );
  }

  addBook(title, author, year, publisher, category) {
    this.publications.push(new Book(title, author, year, publisher, category));
  }

  addWebsite(title, url, year, category) {
    this.publications.push(new Website(title, url, year, category));
  }

  printCitations(type) {
    for (let pub of this.publications) {
      if (type === "APA") {
        console.log(pub.citeAPA());
      } else if (type === "MLA") console.log(pub.citeMLA());
    }
    console.log("\n");
  }

  addData() {
    pubManager.addPaper(
      "The Essence of JavaScript",
      "Arjun Guha, Claudin Saftoiu, Shriram Krishnamurthi",
      2018,
      "TVCG",
      18,
      "Programming"
    );
    pubManager.addPaper(
      "A framework for automated testing of automation systems",
      "Dietmar Winkler, Reinhard Hametner",
      2021,
      "CHI",
      92,
      "testing"
    );
    pubManager.addPaper(
      "The Role of Method Chains and Comments in software Readability and comprehension",
      "Barbara Paech",
      2022,
      "IEEVIS",
      16,
      "Documenting"
    );
    pubManager.addBook(
      "JavaScript and JQuery",
      "Jon Duckett",
      2012,
      "Elsevier",
      "Programming"
    );
    pubManager.addBook(
      "Complete Guide to Test Automation",
      "Arnon Axelrod",
      2020,
      "Oveja Negra",
      "testing"
    );
    pubManager.addBook(
      "Technical Documentation and Process",
      "Jerry C Whitaker",
      2010,
      "Barnes and Noble",
      "Documenting"
    );
    pubManager.addWebsite(
      "Programming Paradigms",
      "https://javascript.info/",
      2005,
      "Programming"
    );
    pubManager.addWebsite(
      "Automation Testing",
      "https://www.guru99.com/automation-testing.html",
      2017,
      "testing"
    );
    pubManager.addWebsite(
      "Code Documentation",
      "https://easternpeak.com/blog/source-code-documentation-best-practices/",
      2006,
      "Documenting"
    );

    let displaytype = prompt(
      "what citation type you want to be displayed, MLA or APA : "
    );
    pubManager.printCitations(displaytype);
  }

  removeCategory(category) {
    this.publications = this.publications.filter(
      (elem) => elem.category !== category
    );
    console.log("Resources after deleting");
    this.publications.forEach((elem) => {
      console.log("=> ", elem.category, " + ", elem.title);
    });
  }
}

const pubManager = new PublicationManager();
pubManager.addData(); // populating the data

const answerd = prompt(
  "Do you want to delete from publications by category(yes / no) :"
);
if (answerd === "yes") {
  console.log(
    "What category do you want to be removed, your options are Programming, testing and Documenting"
  );
  const ch = prompt("enter 1. programming, 2.testing, 3.Documenting");
  switch (ch) {
    case "1":
      pubManager.removeCategory("Programming");
      break;
    case "2":
      pubManager.removeCategory("testing");
      break;
    case "3":
      pubManager.removeCategory("Documenting");
      break;
    default:
      console.log("Sorry, category not found");
  }
} else console.log("Thank you for going through Publications");
