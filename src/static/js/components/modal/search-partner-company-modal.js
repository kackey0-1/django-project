class SearchPartnerCompanyModal extends ModalBase{
    constructor(modalContentId){
        console.log(modalContentId)
        super(modalContentId);
        this.companies = {};
        this.selectedCompany = {};
        this.selectedCallback = ()=>{};
        this.eventInit()
    }

    eventInit(){
        let _this = this;
        this.$('._modal__search-button').on('click', ()=>{
            let industry = _this.$('._modal__large_industry')[0].value;
            let name = _this.$('._modal__name')[0].value;
            console.log(industry)
            console.log(name)

            // Request URL
            const url = location.origin + '/partner_companies/search_json'
            const params = {
                'industry': industry,
                'name': name,
            }
            _this.$('._modal__table').empty();
            $.get(url, params).done(function(data, textStatus, jqXHR){
                // 成功の場合の処理
                data = JSON.parse(data)
                console.log(data)

                data.forEach((company, i) => {
                    console.log(company)
                    _this.companies[company.pk] = {id: company.pk, fields: company.fields};
                    let eRow = $('<tr></tr>');
                    let eTd_btn = $('<button class="_modal__select-btn btn btn-outline-warning btn-md" partner_company_id = "' + company.pk + '" ></button>').text('選択')
                    let eTd_code = $('<td></td>').text(company.fields.code);
                    let eTd_name = $('<td></td>').text(company.fields.company_name);
                    let largeIndustry = company.fields.large_industry;
                    let smallIndustry = company.fields.small_industry;
                    let largeIndustryID = "large_" + largeIndustry + "_hidden";
                    let smallIndustryID = "small_" + smallIndustry + "_hidden";
                    let largeIndustryName = document.getElementById(largeIndustryID).value;
                    let smallIndustryName = document.getElementById(smallIndustryID).value;
                    let eTd_industry = $('<td></td>').text(largeIndustryName + ', ' + smallIndustryName);
                    eRow.append(eTd_btn);
                    eRow.append(eTd_code);
                    eRow.append(eTd_name);
                    eRow.append(eTd_industry);
                    _this.$('._modal__table').append(eRow)
                });

            }).fail(function(jqXHR, textStatus, errorThrown){
                // エラーの場合処理
            });
        })

        $(document).on("click", "._modal__select-btn", function (e) {
            let selected = $(this).attr('partner_company_id')
            console.log(selected)
            this.selectedCompany = selected
            _this.onSelected(selected)
        });
    }
    onSelected(partner_company_id){
        this.modalClose(this.companies[partner_company_id])
    }
}


