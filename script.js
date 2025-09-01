async function loadCompanies() {
  try {
    const response = await fetch("companies.xlsx");
    const arrayBuffer = await response.arrayBuffer();

    const workbook = XLSX.read(arrayBuffer, { type: "array" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(sheet);

    // Store each company as lowercase key
    data.forEach(row => {
      const companyName = row["Company Name"];
      if (companyName) {
        const key = companyName.toLowerCase(); // lowercase key
        localStorage.setItem(key, JSON.stringify(row));
      }
    });

    console.log("Companies stored individually in localStorage (lowercase keys)");

  } catch (err) {
    console.error("Error reading companies.xlsx:", err);
  }
}

loadCompanies();
