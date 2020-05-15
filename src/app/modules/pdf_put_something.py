# PDF出力用のライブラリ
from reportlab.graphics import renderPDF
from reportlab.pdfgen import canvas
from svglib.svglib import svg2rlg
from PyPDF2 import PdfFileWriter, PdfFileReader
from reportlab.lib.colors import pink, black, red, blue, green
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.cidfonts import UnicodeCIDFont
import random, string
from django.conf import settings
import os

import logging

logger = logging.getLogger(__name__)

# ランダムな文字列を生成
# PDFを生成する際にランダムな文字列で一度ファイルをサーバー側で作るため。ただしそのファイルは処理後で消す
def randomname(n):
   randlst = [random.choice(string.ascii_letters + string.digits) for i in range(n)]
   return ''.join(randlst)

# stampを押す際のstampのスケーリングを行う関数
def scale(drawing, scaling_factor):
    """
    Scale a reportlab.graphics.shapes.Drawing()
    object while maintaining the aspect ratio
    """
    scaling_x = scaling_factor
    scaling_y = scaling_factor

    drawing.width = drawing.minWidth() * scaling_x
    drawing.height = drawing.height * scaling_y
    drawing.scale(scaling_x, scaling_y)
    return drawing


# 複数ページ(1ページにつき1枚ずつ)のPDF用のはんこ出力関数
# 1ページ目は page_no = 0
def put_stamp_to_each_pdf(page_dict, existing_pdf_path, output_pdf_path):
    """
    # 単体テスト
    page_no = 1
    scale_ratio_list = [0.8, 1.5]
    input_stamp_path_list = ["./stamp_sample/kawabata_kaisyo-svg.svg", "./stamp_sample/kawabata_kaisyo-svg2.svg"]
    x_list = [100 , 180]
    y_list = [450, 450]
    page_dict = {
        page_no:[text_list, font_size_list, x_list, y_list]
    }
    existing_pdf_path = "./pdf_format/印鑑待ち_工事注文書（約款付）.pdf"
    output_pdf_path = "./output/multiple_text.pdf"
    put_text_to_each_pdf(page_dict, existing_pdf_path, output_pdf_path)
    """
    existing_pdf = PdfFileReader(open(existing_pdf_path, "rb")) # 既存のPDFを指定
    output = PdfFileWriter()
    for existing_page_no in range(existing_pdf.getNumPages()):
        page = existing_pdf.getPage(existing_page_no)
        if existing_page_no in page_dict.keys():
            stamp_path_list, scale_ratio_list,x_list, y_list = page_dict[existing_page_no]
            if not (len(stamp_path_list) == len(scale_ratio_list) == len(x_list) == len(y_list) ):
                print("入力値に誤りがあります")
                print(len(stamp_path_list), len(scale_ratio_list), len(x_list), len(y_list))
            buffer_pdf_path = os.path.join(settings.PDF_PATH,"pdf_buffer", randomname(100) + ".pdf")
            can = canvas.Canvas(buffer_pdf_path, pagesize=A4) # A4のPDFを生成
            
            
            for i in range(len(stamp_path_list)):  
                drawing = svg2rlg(stamp_path_list[i])
                scaled_drawing = scale(drawing, scaling_factor=scale_ratio_list[i])
                renderPDF.draw(scaled_drawing, can, x_list[i], y_list[i])
            
            can.save()
            new_pdf = PdfFileReader(buffer_pdf_path)
            page.mergePage(new_pdf.getPage(0))
            output.addPage(page)
            os.remove(buffer_pdf_path)
        else:
            output.addPage(page)

        with open(output_pdf_path, 'wb') as f:
                output.write(f)
    os.remove(existing_pdf_path)
    return output_pdf_path

    

# stampを指定したファイルにおす関数
def put_stamp(stamp_path_list, scale_ratio_list, x_list, y_list, existing_pdf_path, output_pdf_path):
    # stampを押す際のstampのスケーリングを行う関数
    """
    # 単体テスト内容
    input_stamp_path_list = ["./stamp_sample/kawabata_kaisyo-svg.svg", "./stamp_sample/kawabata_kaisyo-svg2.svg"]
    scale_ratio_list = [0.8, 1.5]
    x_list = [450, 350]
    y_list = [60, 150]
    existing_pdf_path = "./pdf_format/【ご請求書】format.pdf"
    output_pdf_path = "./output/【ご請求書】Alice様テスト用シート御中_Alice様テスト用シート_20200110.pdf"
    put_stamp(input_stamp_path_list, scale_ratio_list, x_list, y_list, existing_pdf_path, output_pdf_path)
    """
    buffer_pdf_path = os.path.join(settings.PDF_PATH, "pdf_buffer", randomname(100) + ".pdf")
    my_canvas = canvas.Canvas(buffer_pdf_path)
    
    if not (len(stamp_path_list) == len(scale_ratio_list) == len(x_list) == len(y_list)):
        logger.debug("入力に誤りがあります")

    for i in range(len(stamp_path_list)):
        drawing = svg2rlg(stamp_path_list[i])
        scaled_drawing = scale(drawing, scaling_factor=scale_ratio_list[i])
        
        renderPDF.draw(scaled_drawing, my_canvas, x_list[i], y_list[i])
    my_canvas.save()

    new_pdf = PdfFileReader(buffer_pdf_path)
    existing_pdf = PdfFileReader(open(existing_pdf_path, "rb")) # 既存のPDFを指定
    output = PdfFileWriter()
    page = existing_pdf.getPage(0)
    page.mergePage(new_pdf.getPage(0))
    output.addPage(page)

    with open(output_pdf_path, 'wb') as f:
        output.write(f)
    os.remove(buffer_pdf_path)
    return output_pdf_path

# テキストを指定した位置に配置する
# 色を付ける場所を指定するcolor_location_listを引数に入れる
def put_text(text_list, font_size_list, x_list, y_list, existing_pdf_path, output_pdf_path):
    """
    # 単体テスト
    text_list = ["hello_world", "Pythonで記載した"]
    font_size_list = [11, 11]
    x_list = [100 , 180]
    y_list = [450, 450]
    existing_pdf_path = "./pdf_format/【ご請求書】format.pdf"
    output_pdf_path = "./output/【ご請求書】Alice様テスト用シート御中_Alice様テスト用シート_20200110.pdf"
    put_text(text_list, font_size_list, x_list, y_list, existing_pdf_path, output_pdf_path)
    """
    
    if not (len(text_list) == len(font_size_list) == len(x_list) == len(y_list) ):
        logger.debug("入力値に誤りがあります")
    buffer_pdf_path = os.path.join(settings.PDF_PATH, "pdf_buffer", randomname(100) + ".pdf")
    can = canvas.Canvas(buffer_pdf_path, pagesize=A4) # A4のPDFを生成
    fontname = "HeiseiMin-W3" # フォントを指定
    pdfmetrics.registerFont (UnicodeCIDFont (fontname))
    
    for i in range(len(text_list)):         
        try:
            can.setFillColor(black)
            can.setFont(fontname,font_size_list[i]) # フォントサイズを指定
            can.drawString(x_list[i], y_list[i], text_list[i]) # 文字を描く
            # can.drawString(x_list[i], y_list[i], "あ") # 文字を描く
        except AttributeError:
            # リストに含まれている場合は(text, color)のリストとなっている
            can.setFillColor(text_list[i][1])
            can.setFont(fontname,font_size_list[i]) # フォントサイズを指定
            can.drawString(x_list[i], y_list[i], text_list[i][0]) # 文字を描く
            
    can.save()
    new_pdf = PdfFileReader(buffer_pdf_path)
    existing_pdf = PdfFileReader(open(existing_pdf_path, "rb")) # 既存のPDFを指定
    output = PdfFileWriter()
    page = existing_pdf.getPage(0)
    page.mergePage(new_pdf.getPage(0))
    output.addPage(page)

    with open(output_pdf_path, 'wb') as f:
        output.write(f)
    os.remove(buffer_pdf_path)
    return output_pdf_path



# 複数ページ(1ページにつき1枚ずつ)のPDF用のテキスト出力関数
# 1ページ目は page_no = 0
def put_text_to_each_pdf(page_dict, existing_pdf_path, output_pdf_path):
    """
    # 単体テスト
    page_no = 1
    text_list = ["hello_world", "Pythonで記載した"]
    font_size_list = [11, 11]
    x_list = [100 , 180]
    y_list = [450, 450]
    page_dict = {
        page_no:[text_list, font_size_list, x_list, y_list]
    }
    existing_pdf_path = "./pdf_format/印鑑待ち_工事注文書（約款付）.pdf"
    output_pdf_path = "./output/multiple_text.pdf"
    put_text_to_each_pdf(page_dict, existing_pdf_path, output_pdf_path)
    """
    existing_pdf = PdfFileReader(open(existing_pdf_path, "rb")) # 既存のPDFを指定
    output = PdfFileWriter()
    for existing_page_no in range(existing_pdf.getNumPages()):
        page = existing_pdf.getPage(existing_page_no)
        if existing_page_no in page_dict.keys():
            text_list, font_size_list, x_list, y_list = page_dict[existing_page_no]
            if not (len(text_list) == len(font_size_list) == len(x_list) == len(y_list) ):
                print("入力値に誤りがあります")
                print(len(text_list), len(font_size_list), len(x_list), len(y_list))
            buffer_pdf_path = os.path.join(settings.PDF_PATH,"pdf_buffer", randomname(100) + ".pdf")
            can = canvas.Canvas(buffer_pdf_path, pagesize=A4) # A4のPDFを生成
            fontname = "HeiseiMin-W3" # フォントを指定
            pdfmetrics.registerFont (UnicodeCIDFont (fontname))
            
            
            for i in range(len(text_list)):
                try:
                    can.setFillColor(black) # 文字の色を指定    
                    can.setFont(fontname,font_size_list[i]) # フォントサイズを指定
                    can.drawString(x_list[i], y_list[i], text_list[i]) # 文字を描く
                except AttributeError:
                    can.setFillColor(text_list[1]) # 文字の色を指定  
                    can.setFont(fontname,font_size_list[i]) # フォントサイズを指定
                    can.drawString(x_list[i], y_list[i], text_list[i][0]) # 文字を描く
            can.save()
            new_pdf = PdfFileReader(buffer_pdf_path)
            page.mergePage(new_pdf.getPage(0))
            output.addPage(page)
            os.remove(buffer_pdf_path)
        else:
            output.addPage(page)

        with open(output_pdf_path, 'wb') as f:
                output.write(f)
    return output_pdf_path

# 複数ページ(1ページにつき複数)のPDF用のテキスト出力関数
# 1ページ目は page_no = 0
def put_text_to_multiple_pdf(page_list, text_list_list, font_size_list_list, x_list_list, y_list_list, existing_pdf_path, output_pdf_path):
    """
    # 単体テスト
    page_list = [1,3,3]
    text_list_list = [["hello_world", "Pythonで記載した"],["rtt","fgs"],["1234"]]
    font_size_list_list = [[11, 11],[23,11],[10]]
    x_list_list = [[100 , 180],[34,12],[100]]
    y_list_list = [[450, 450],[34,78],[100]]
    color_location_list_list = [[0],[1],[]]
    existing_pdf_path = "./pdf_format/印鑑待ち_工事注文書（約款付）.pdf"
    output_pdf_path = "./output/multiple_text.pdf"
    put_text_to_multiple_pdf(page_list, text_list_list, font_size_list_list, x_list_list, y_list_list, existing_pdf_path, output_pdf_path)

    """
    if not (len(page_list) == len(text_list_list) == len(font_size_list_list) == len(x_list_list) == len(y_list_list)):
        print("入力値に誤りがあります")
        print(len(page_list) ,len(text_list_list), len(font_size_list), len(x_list), len(y_list))
    output = PdfFileWriter()
    for i in range(len(page_list)):
        page_num = page_list[i]
        text_list = text_list_list[i]
        font_size_list = font_size_list_list[i]
        x_list = x_list_list[i]
        y_list = y_list_list[i]
        existing_pdf = PdfFileReader(open(existing_pdf_path, "rb")) # 既存のPDFを指定
        page = existing_pdf.getPage(page_num)
        buffer_pdf_path = os.path.join(settings.PDF_PATH,"pdf_buffer", randomname(100) + ".pdf")
        can = canvas.Canvas(buffer_pdf_path, pagesize=A4) # A4のPDFを生成
        fontname = "HeiseiMin-W3" # フォントを指定
        pdfmetrics.registerFont (UnicodeCIDFont (fontname))
        
        
        for j in range(len(text_list)): 
            # 修正が必要になったので、テキストがtuple型に格納されているならば赤色、そうでないならば黒色
            try:
                can.setFillColor(black) # 文字の色を黒色に指定
                can.setFont(fontname,font_size_list[j]) # フォントサイズを指定
                can.drawString(x_list[j], y_list[j], text_list[j]) # 文字を描く
            except AttributeError:
                can.setFillColor(text_list[j][1]) # 文字の色を指定
                can.setFont(fontname,font_size_list[j]) # フォントサイズを指定
                can.drawString(x_list[j], y_list[j], text_list[j][0]) # 文字を描く
                
        can.save()
        new_pdf = PdfFileReader(buffer_pdf_path)
        page.mergePage(new_pdf.getPage(0))
        output.addPage(page)
        os.remove(buffer_pdf_path)    
        with open(output_pdf_path, 'wb') as f:
            output.write(f)
    return output_pdf_path

