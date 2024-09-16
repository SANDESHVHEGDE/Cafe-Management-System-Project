import { Component } from '@angular/core';
import { CafeService } from '../../cafe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { Item } from '../../model/Item.model';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.css'
})
export class AddItemComponent {

  itemId: any='';
  itemName: string ='';
  description: string = '';
  price: any='';
  itemImage: any ='';
  imagePreview: string | ArrayBuffer | null = null;
  category: string='';
  getCategoryList: any[] = [];
  isSidebarExpanded: boolean = false;
  isEdit: boolean = false;

  constructor ( 
    private cafeservice:CafeService, 
    private router: Router,
    private activateRouter: ActivatedRoute
  ) { 
    this.activateRouter.queryParams.subscribe((params: any) => {
      if (params?.id) {
        this.isEdit = true;
        console.log(params?.id);
        this.cafeservice.getMenuById(params?.id).pipe(take(1)).subscribe((res:any)=> {
          if(!!res && res?.itemId){
          
            const item :Item=res;
            console.log('>>>>', item);

            this.itemId = item?.itemId;
            this.itemName = item?.itemName;
            this.description = item?.description;
            this.price = item?.price;
            this.itemImage = item?.itemImage;
            const categoryName = this.getCategoryList.find((cate: any) => cate?.name.toString() === item?.category)?.value;
            this.category = categoryName;
          
          }
          console.log(res);
        });
      }

    })

  }

  ngOnInit(): void {

      this.cafeservice.isUserLoginPresent();
      this.getCategoryList = this.cafeservice.getCategoryList();
    
  }

  onAddItem(): void {
   
    if (this.itemName === '') {
      alert("item name  is required");
      return;
    }

    if (this.description === '') {
      alert("description  is required");
      return;
    }

    if (this.price === '') {
      alert("price  is required");
      return;
    }

    if (this.price === 0 || this.price === null) {
      alert("image  is required");
      return;
    }

    const body: any = {
      itemName: this.itemName,
      description: this.description,
      price: this.price,
      itemImage: this.itemImage,
      category: this.category,
    }

    if(this.isEdit){
      console.log("edit item =======>", body);
    this.cafeservice.editItem(this.itemId,body).pipe(take(1)).subscribe((res: any) => {
      console.log("*****", res);
      if (res && res?.itemId) {+
        alert("Item updated sucessfully");
         this.router.navigate(["/admin/admin-menulist"]);
      }
    }, err => {
      console.log("Error  ", err);
      alert("Something going wrong!! Please try again");
    })
    }else{
      console.log("add item =======>", body);
      this.cafeservice.addItem(body).pipe(take(1)).subscribe((res: any) => {
        console.log("*****", res);
        if (res && res?.itemId) {
          alert("Item added sucessfully");
          this.router.navigate(["/admin/admin-menulist"]);
        }
      }, err => {
        console.log("Error  ", err);
        alert("Something going wrong!! Please try again");
      })
    }
 
  }







  // itemId: any = '';
  // itemName: string = '';
  // description: string = '';
  // price: any = '';
  // itemImage: any | null = null;  // Changed to File type
  // imagePreview: string | ArrayBuffer | null = null;
  // category: string = '';
  // getCategoryList: any[] = [];
  // isSidebarExpanded: boolean = false;
  // isEdit: boolean = false;

  // constructor(
  //   private cafeservice: CafeService, 
  //   private router: Router,
  //   private activateRouter: ActivatedRoute
  // ) { 
  //   this.activateRouter.queryParams.subscribe((params: any) => {
  //     if (params?.id) {
  //       this.isEdit = true;
  //       console.log(params?.id);
  //       this.cafeservice.getMenuById(params?.id).pipe(take(1)).subscribe((res: any) => {
  //         if (!!res && res?.itemId) {
  //           const item: Item = res;
  //           console.log('>>>>', item);

  //           this.itemId = item?.itemId;
  //           this.itemName = item?.itemName;
  //           this.description = item?.description;
  //           this.price = item?.price;
  //           this.itemImage = item?.itemImage;  // If it's a URL or similar, handle accordingly
  //           // this.imagePreview = item?.itemImage;  // Assuming it's a URL string
  //           const categoryName = this.getCategoryList.find((cate: any) => cate?.name.toString() === item?.category)?.value;
  //           this.category = categoryName;
  //         }
  //         console.log(res);
  //       });
  //     }
  //   });
  // }

  // ngOnInit(): void {
  //   this.cafeservice.isUserLoginPresent();
  //   this.getCategoryList = this.cafeservice.getCategoryList();
  // }

  // onFileChanged(event: Event) {
  //   const input = event.target as HTMLInputElement;
  //   if (input.files && input.files[0]) {
  //     this.itemImage = input.files[0]; // Save the file object

  //     // Preview the image
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       this.imagePreview = reader.result as string; // Set the preview
  //     };
  //     reader.readAsDataURL(this.itemImage);  // Read as Data URL for preview
  //   }
  // }

  // onAddItem(): void {
  //   // Validations
  //   if (this.itemName === '') {
  //     alert("Item name is required");
  //     return;
  //   }

  //   if (this.description === '') {
  //     alert("Description is required");
  //     return;
  //   }

  //   if (this.price === '' || this.price === 0 || this.price === null) {
  //     alert("Price is required and must be greater than zero");
  //     return;
  //   }

  //   // Form Data to handle file upload
  //   const formData = new FormData();
  //   formData.append('itemName', this.itemName);
  //   formData.append('description', this.description);
  //   formData.append('price', this.price.toString());
  //   if (this.itemImage) {
  //     formData.append('itemImage', this.itemImage);  // Append the file object
  //   }
  //   formData.append('category', this.category);

  //   if (this.isEdit) {
  //     console.log("Edit item =======>", formData);
  //     this.cafeservice.editItem(this.itemId, formData).pipe(take(1)).subscribe((res: any) => {
  //       console.log("*****", res);
  //       if (res && res?.itemId) {
  //         alert("Item updated successfully");
  //         this.router.navigate(["/admin/admin-menulist"]);
  //       }
  //     }, err => {
  //       console.log("Error  ", err);
  //       alert("Something went wrong! Please try again");
  //     });
  //   } else {
  //     console.log("Add item =======>", formData);
  //     this.cafeservice.addItem(formData).pipe(take(1)).subscribe((res: any) => {
  //       console.log("*****", res);
  //       if (res && res?.itemId) {
  //         alert("Item added successfully");
  //         this.router.navigate(["/admin/admin-menulist"]);
  //       }
  //     }, err => {
  //       console.log("Error  ", err);
  //       alert("Something went wrong! Please try again");
  //     });
  //   }
  // }




}
