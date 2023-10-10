const Queue = require("./Queue");

class StarshipEnterprise {
  constructor(officerId = null, officerName = null, reportTo = null) {
    this.officerId = officerId;
    this.officerName = officerName;
    this.reportTo = reportTo; // the officer that the new officer reports to
    this.leftReport = null;
    this.rightReport = null;
  }

  assignOfficer(officerId, officerName) {
  if (!this.officerId) {
    // If the current officer is null, assign the new officer here
    this.officerId = officerId;
    this.officerName = officerName;
    return;
  }

  if (officerId < this.officerId) {
    // If the new officer has a lower ID, assign them to the left subtree
    if (this.leftReport === null) {
      this.leftReport = new StarshipEnterprise(officerId, officerName, this);
    } else {
      this.leftReport.assignOfficer(officerId, officerName);
    }
  } else if (officerId > this.officerId) {
    // If the new officer has a higher ID, assign them to the right subtree
    if (this.rightReport === null) {
      this.rightReport = new StarshipEnterprise(officerId, officerName, this);
    } else {
      this.rightReport.assignOfficer(officerId, officerName);
    }
  }
  // If officerId is equal, we do nothing (assuming duplicate IDs are not allowed).
}

  findOfficersWithNoDirectReports(values = []) {
  // If there is no left and right report, add the officer to the values array
  if (this.leftReport === null && this.rightReport === null) {
    values.push(this.officerName);
  }

  // Recursively traverse the left subtree
  if (this.leftReport !== null) {
    this.leftReport.findOfficersWithNoDirectReports(values);
  }

  // Recursively traverse the right subtree
  if (this.rightReport !== null) {
    this.rightReport.findOfficersWithNoDirectReports(values);
  }

  return values;
}

  listOfficersByExperience(officerNames = []) {
  // Recursively traverse the right subtree (higher experience levels first)
  if (this.rightReport !== null) {
    this.rightReport.listOfficersByExperience(officerNames);
  }

  // Add the current officer's name to the array
  officerNames.push(this.officerName);

  // Recursively traverse the left subtree (lower experience levels next)
  if (this.leftReport !== null) {
    this.leftReport.listOfficersByExperience(officerNames);
  }

  return officerNames;
}

  listOfficersByRank(tree, rankedOfficers = {}) {
  if (!tree) {
    // Base case: If the tree is empty, return the ranked officers object
    return rankedOfficers;
  }

  const queue = new Queue();
  queue.enqueue({ officer: tree, rank: 1 }); // Start with the captain at rank 1

  while (!queue.isEmpty()) {
    const { officer, rank } = queue.dequeue();

    if (!rankedOfficers[rank]) {
      rankedOfficers[rank] = []; // Initialize the rank array if it doesn't exist
    }

    rankedOfficers[rank].push(officer.officerName);

    if (officer.leftReport) {
      queue.enqueue({ officer: officer.leftReport, rank: rank + 1 });
    }

    if (officer.rightReport) {
      queue.enqueue({ officer: officer.rightReport, rank: rank + 1 });
    }
  }

  return rankedOfficers;
}
}

module.exports = StarshipEnterprise;
