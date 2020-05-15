class SearchEstimationTemplatesModal extends ModalBase{
    constructor(modalContentId){
        console.log(modalContentId)
        super(modalContentId);
        this.selectedCallback = ()=>{};
        this.eventInit()
    }

    eventInit(){
        const _this = this
        /* モーダル検索ボタン押下時の挙動 */
        $('#_estimation_template_search_btn').on('click',function(){
            $('._newRow').remove()
            const target = $('#_add_row_target')
            const params = {
                'entry_name': document.getElementById('_estimation_template_entry_name').value,
                'detail_name': document.getElementById('_estimation_template_detail_name').value,
            }
            const estimation_id = $(this).val()
            const url = location.origin + "/estimates/estimation_templates"
            /** 削除リクエスト */
            $.get(url, params).done(function(data, textStatus, jqXHR){
                // 成功の場合の処理
                console.log(JSON.parse(data.estimation_entry_templates))
                console.log(JSON.parse(data.estimation_entry_detail_templates))

                JSON.parse(data.estimation_entry_templates).forEach((estimation_entry_template) => {
                    //
                    let templateValues = {
                        estimationEntryTemplate: {},
                        estimationEntryDetailTemplate: [],
                    }
                    let addRow = $('._hidden_template_row').clone()
                    addRow.find("[name='estimation_template_codes']").text(estimation_entry_template.fields.code)
                    addRow.find("[name='taxonomy1s']").text(estimation_entry_template.fields.taxonomy1)
                    addRow.find("[name='taxonomy2s']").text(estimation_entry_template.fields.taxonomy2)
                    addRow.find("[name='entry_names']").text(estimation_entry_template.fields.name)
                    //親画面に引き渡すための値セット
                    templateValues.estimationEntryTemplate.id = estimation_entry_template.pk
                    templateValues.estimationEntryTemplate.name = estimation_entry_template.fields.name
                    templateValues.estimationEntryTemplate.quantity = 1
                    JSON.parse(data.estimation_entry_detail_templates).forEach((estimation_entry_detail_template) => {
                        let detail = {}
                        if (estimation_entry_template.pk === estimation_entry_detail_template.fields.estimation_entry_template){
                            if(addRow.find("[name='detail_names']").text() !== ""){
                                addRow.find("[name='detail_names']").text(addRow.find("[name='detail_names']").text() + "," + estimation_entry_detail_template.fields.name)
                            } else {
                                addRow.find("[name='detail_names']").text(estimation_entry_detail_template.fields.name)
                            }
                            detail.name = estimation_entry_detail_template.fields.name
                            detail.project_type = estimation_entry_detail_template.fields.project_type
                            detail.nominal_price = estimation_entry_detail_template.fields.nominal_price
                            detail.nominal_unit = estimation_entry_detail_template.fields.nominal_unit
                            detail.price = estimation_entry_detail_template.fields.price
                            detail.quantity = 1
                            detail.unit = estimation_entry_detail_template.fields.unit
                            detail.cost = estimation_entry_detail_template.fields.cost
                            detail.description = estimation_entry_detail_template.fields.description
                            templateValues.estimationEntryDetailTemplate.push(detail)
                        }
                    });
                    console.log(templateValues)
                    addRow.find("[name='estimation_templates_params']").val(JSON.stringify(templateValues))
                    target.append(addRow.removeClass('_hidden_template_row').addClass('_newRow'))
                });

            }).fail(function(jqXHR, textStatus, errorThrown){
                // エラーの場合処理
                console.log(jqXHR)
                console.log(textStatus)
                console.log(errorThrown)
            });
        });

        //_estimation_template_choose_btn
        $(document).on("click", "#_estimation_template_choose_btn", function (e) {
            const params = $('[name="estimation_templates_params"]:checked').map(function(){
                return $(this).val();
            }).get();
            $('._newRow').remove()
            console.log(params)
            _this.modalClose(params)
        });
    }
}
