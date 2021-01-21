import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/services/employee';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {pdfMake} from 'pdfmake/build/pdfmake';
import {pdfFonts} from 'pdfmake/build/vfs_fonts';



@Component({
  selector: 'app-payslip-gen',
  templateUrl: './payslip-gen.component.html',
  styleUrls: ['./payslip-gen.component.scss']
})
export class PayslipGenComponent implements OnInit {

  payslipForm: FormGroup;
  item: Employee;
  currentDate = Date.now();
  quantity: number;
  totalAmount: number;
  bonus: number = 0;
  basic: number;

  validation_messages = {
    'totalDays': [
      { type: 'required', message: 'Please enter total working days.' },
      { type: 'max', message: 'Please enter total working days(<365).' },

    ],
    'salary': [
      { type: 'required', message: 'please enter the basic salary.'},
      { type: 'max', message: 'salary should be less than 100000.' },
    ],
  };

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    this.route.data.subscribe(routeData => {
      let data = routeData['data']
      console.log(data)
      if(data) {
        this.item = data.payload.data();
        this.item.id = data.payload.id;
        this.createForm();
      }
    })
  }

  createForm() {
    this.payslipForm = this.fb.group({
      totalDays: ['', [Validators.required, Validators.max(365)]],
      salary: ['', [Validators.required, Validators.max(100000)]],
      bonus: ['', [Validators.max(100000)]],
    })
  }

  onSubmit(value) { 
    this.basic = parseInt(value.salary);
    this.quantity = parseInt(value.totalDays);
    this.bonus = parseInt(value.bonus);
    this.totalAmount = (this.basic*this.quantity) + this.bonus;
    this.currentDate = Date.now();
    const docDefinition = this.getDocumentDefinition();
    pdfMake.createPdf(docDefinition).open();
  }

  getDocumentDefinition() {
    return {
      info: {
        title: 'Payslip: ' + this.item.firstName + this.currentDate
      },
      content: [
        {
          columns: [
            [{
              image: this.getPayslipPic()
            },
              {
              text: this.item.firstName + this.item.lastName,
              style: 'name'
            },
            {
              text: this.item.email
            },
            {
              text: this.item.mobileNumber
            }],
            {
              text: 'PAYSLIP',
              style: 'title'
            },
            {
              text: 'Date' + new Date(this.currentDate)
            }
          ]
        },
        {
          style: 'tableExample',
          table: {
            headerRows: 1,
            body: [
              [{text: 'S.No', style: 'tableHeader', border: [false, true, false, true]}, {text: 'Category', style: 'tableHeader', border: [false, true, false, true]}, {text: 'Basis', style: 'tableHeader', border: [false, true, false, true]}, {text: 'Quantity', style: 'tableHeader', border: [false, true, false, true]}, {text: 'Amount', style: 'tableHeader', border: [false, true, false, true]}],
              ['1', 'Basic Salary', this.basic, this.quantity, (this.basic*this.quantity)],
              ['2', 'Bonus', this.bonus, '1', this.bonus]
            ]
          },
          layout: 'headerLineOnly'
        },
        {
          text: 'Total Amount: Rs.'+ this.totalAmount,
          style: 'totalAmount'
        },
        {
          style: 'tableExample2',
          table: {
            body: [
              [
                '',
                '',
                '',
                ''
              ],
              [
                '',
                {
                  rowSpan: 18,
                  colSpan: 18,
                  border: [true, true, true, true],
                  fillColor: '#cccccc',
                  style: 'tableHeader',
                  text: 'Signature: '
                },
                '',
                ''
              ],
            ]
          },
          layout: {
            defaultBorder: false,
          }
        },

      ],
    styles: {
      name: {
        fontSize: 16,
        bold: true
      },
      totalAmount: {
        fontSize: 14,
        bold: true,
        margin: [302, 8, 0, 20]
      },
      title: {
        decoration: 'underline'
      },
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10]
      },
      subheader: {
        fontSize: 16,
        bold: true,
        margin: [0, 10, 0, 5]
      },
      tableExample: {
        margin: [0, 5, 0, 15]
      },
      tableExample2: {
        margin: [372, 5, 0, 15]
      },
      tableHeader: {
        bold: true,
        fontSize: 13,
        color: 'black'
      }
    }
    }
  }

  getPayslipPic() {
    return {
      image: 'src/assets/images/logo/logo.png',
      alignment: 'left'
    };
  }

  cancel() {
    this.router.navigate(['/home']);
  }
}
