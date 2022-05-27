const cheerio = require('cheerio');
const request = require('request-promise');
const fs = require('fs');

async function getAll() {
    let data = [],
        page = 1;
    for (page = 1; page <= 10;) {
        await request('https://yomaps.net/vi/VN/24-ha-noi/type/28-dentist?page=' + page.toString(), (error, response, html) => {
            if (!error && response.statusCode == 200) {
                let $ = cheerio.load(html);
                // data = $('.block-grid-v2-info').find('.text-ellipsis a').attr('href');
                $('.block-grid-v2-info').each((index, el) => {
                    data.push(el.children[1].children[0].attribs.href);
                });
                page++;
            } else {
                console.log(error);
            }
        });
    }
    return data;
}
async function getDetail(url) {
    let result = {};
    await request('https://yomaps.net' + url.toString(), (error, response, htmlDetail) => {
        if (!error && response.statusCode == 200) {
            let $ = cheerio.load(htmlDetail);
            let type = $('tr:eq(0)').find('td:eq(1)').text().trim();
            let store = $('h1').text().trim().replace("Bác sỹ nha khoa: ", "");
            let address = $('tr:eq(1)').find('td:eq(1)').text().trim();
            let location = $('tr:eq(2)').find('td:eq(1)').find('a').text().trim().replace("  -  Xem vị trí trên bản đồ","");
            let phone = $('tr:eq(3)').find('td:eq(1)').text().trim();
            let site = $('tr:eq(4)').find('td:eq(1)').text().trim();
            let img = "";
            $('.fancybox > img').each((i, it) => {
                if (it && it.attribs && it.attribs.src) {
                    img += it.attribs.src + ",";
                }
            });
            result = { type, store, address, location, phone, site, img };
        }
    })
    return result;
}


const XLSX = require('xlsx')

// array of objects to save in Excel
let binary_univers = [{ 'name': 'Hi', 'value': 1 }, { 'name': 'Bye', 'value': 0 }]



function main() {
    let result = [];

    data = getAll();
    getAll().then((res) => {
        res.forEach(item => {
            getDetail(item).then((res) => {
                result.push(res);
                fs.writeFileSync('dentist.json', JSON.stringify(result)); // lưu dữ liệu vào file data.json
            });
        })
    });
   
}
main()