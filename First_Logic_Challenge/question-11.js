function solucao(min, km) {
    const minutosAdicionais = min - 20;
    const kmAdicionais = km - 10;
    if (min <= 20 && km <= 10) {
        console.log((min * 50) + (km * 70))
    } else if (min > 20 && km <= 10) {
        console.log((20 * 50) + (minutosAdicionais * 30) + (km * 70));
    } else if (min <= 20 && km > 10) {
        console.log((min * 50) + (10 * 70) + (kmAdicionais * 50));
    } else {
        console.log((20 * 50) + (minutosAdicionais * 30) + (10 * 70) + (kmAdicionais * 50));
    }
}

//resolução

let custoMinuto = 0;
let custoKm = 0;

if (km > 10) {
    custoKm = 70 * 10 + 50 * (km - 10)

} else {
    custoKm = 70 * km;
}

if (min > 20) {
    custoMin = 50 * 20 + 30 * (min - 20)
} else {
    custoMin = 50 * min;
}

console.log(custoKm + custoMinuto)