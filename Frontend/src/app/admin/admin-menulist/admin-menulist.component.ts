import { Component } from '@angular/core';
import { CafeService } from '../../cafe.service';
import { Router } from '@angular/router';
import { Item } from '../../model/Item.model';
import { take } from 'rxjs';

@Component({
  selector: 'app-admin-menulist',
  templateUrl: './admin-menulist.component.html',
  styleUrl: './admin-menulist.component.css'
})
export class AdminMenulistComponent {

  getCategoryList: any[] = [];
  category: any= '';
  categoryItems: Array<Item> = [];
  AllItems: Array<Item> = [];

  constructor ( 
                private cafeservice:CafeService,
                private router: Router 
              ) { 
    this.cafeservice.isUserLoginPresent();

    this.cafeservice.getAllItems().subscribe(items => {
      this.AllItems = items;
      this.categoryItems = this.AllItems;
      console.log('Items are selected :', this.AllItems);
    }, (err: any) => {
        console.log("Error");
      });
    
  }
 
  ngOnInit(): void {
    this.getCategoryList = this.cafeservice.getCategoryList();

  } 


 selectCategory(value: number) {
    this.category = value;
    console.log('Selected category:', this.category);

    this.cafeservice.getItemByCategory(this.category).subscribe(items => {
      this.categoryItems = items;
      console.log('Items for selected category:', this.categoryItems);
    }, (err: any) => {
        console.log("Error");
      });
}


selectAllItems(){

  this.cafeservice.getAllItems().subscribe(items => {
    this.AllItems = items;
    this.categoryItems = this.AllItems;
    console.log('Items are selected :', this.AllItems);
  }, (err: any) => {
      console.log("Error");
    });
}



editItem(item: Item): void {
  this.router.navigate(['/admin/add-item'], {
    queryParams: {
      id: item?.itemId
    }
  });
 
}


delItem(item: Item): void {
  if (confirm(`Are you sure you want to delete ${item.itemName}?`)) {
    this.cafeservice.deleteItem(item?.itemId).pipe(take(1)).subscribe(
      (res: any) => {
        alert("Item deleted successfully");
        // Remove the deleted item from the list to update the UI
        this.categoryItems = this.categoryItems.filter(i => i.itemId !== item.itemId);
      }, err => {
        console.log("Error while deleting item", err);
      });
  }
}

}
