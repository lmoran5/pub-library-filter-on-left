document.addEventListener("DOMContentLoaded", function() {
    history.pushState({}, "", "/scientific-publication-library-test");
    updateResultsCount();
});

let filters = {
    tagSearch: '',
    journalNameSearch: '',
    subSpecialty: [],
    productDropdown: [],
    authorDropdown: []
};

function normalizeText(text) {
    return text.toLowerCase().replace(/'/g, "").replace(/-/g, "");
}

function updateResultsCount() {
    const cards = document.querySelectorAll(".card");
    let visibleCount = 0;

    cards.forEach(card => {
        if (card.style.display !== "none") {
            visibleCount++;
        }
    });

    document.getElementById("resultsCount").textContent = `Results Found: ${visibleCount}`;
}

function applyFilters() {
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        const cardContent = card.querySelector(".card-content");
        const tagText = cardContent.querySelector("p:nth-child(3)").textContent;
        const journalNameText = cardContent.querySelector("h3").textContent;
        const subSpecialtyText = cardContent.querySelector("p:nth-child(4)").textContent;
        const productText = cardContent.querySelector("p:nth-child(5)").textContent;
        const authorText = cardContent.querySelector("p:nth-child(6)").textContent;

        const tagMatch = !filters.tagSearch || normalizeText(tagText).includes(normalizeText(filters.tagSearch));
        const journalNameMatch = !filters.journalNameSearch || normalizeText(journalNameText).includes(normalizeText(filters.journalNameSearch));
        const subSpecialtyMatch = filters.subSpecialty.length === 0 || filters.subSpecialty.some(subSpecialty => normalizeText(subSpecialtyText).includes(normalizeText(subSpecialty)));
        const productMatch = filters.productDropdown.length === 0 || filters.productDropdown.some(product => normalizeText(productText).includes(normalizeText(product)));
        const authorMatch = filters.authorDropdown.length === 0 || filters.authorDropdown.some(author => normalizeText(authorText).includes(normalizeText(author)));

        if (tagMatch && journalNameMatch && subSpecialtyMatch && productMatch && authorMatch) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }
    });

    updateResultsCount();
}

function searchByField(fieldId) {
    const input = document.getElementById(fieldId);
    filters[fieldId] = input.value.toLowerCase();
    applyFilters();
}

function filterByDropdown(fieldId) {
    const dropdown = document.getElementById(fieldId);
    filters[fieldId] = dropdown.value.toLowerCase();
    applyFilters();
}

function filterByMultipleCheckbox(fieldId) {
    const checkboxes = document.querySelectorAll(`#checkboxes${capitalizeFirstLetter(fieldId)} input[type="checkbox"]`);
    filters[fieldId] = Array.from(checkboxes).filter(checkbox => checkbox.checked).map(checkbox => checkbox.value.toLowerCase());
    applyFilters();
}

function clearFilters() {
    document.getElementById('tagSearch').value = '';
    document.getElementById('journalNameSearch').value = '';
    document.querySelectorAll('#checkboxesSubSpecialty input[type="checkbox"]').forEach(checkbox => checkbox.checked = false);
    document.querySelectorAll('#checkboxesProduct input[type="checkbox"]').forEach(checkbox => checkbox.checked = false);
    document.querySelectorAll('#checkboxesAuthor input[type="checkbox"]').forEach(checkbox => checkbox.checked = false);

    filters = {
        tagSearch: '',
        journalNameSearch: '',
        subSpecialty: [],
        productDropdown: [],
        authorDropdown: []
    };

    applyFilters();
}

function showCheckboxes(id) {
    const checkboxes = document.getElementById(id);
    if (checkboxes.style.display === "block") {
        checkboxes.style.display = "none";
    } else {
        checkboxes.style.display = "block";
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


