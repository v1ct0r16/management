import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import {  ProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('add')
  async createProduct(@Body() payload: ProductDto){
    return await this.productService.create(payload);
  }

  @Get('findall')
  findAll() {
    return this.productService.findAll();
  }

  @Get('getByName/:name')
async findName(@Param('name') name: string){
    return await this.productService.findOne(name);
}

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.productService.findOne(+id);
  // }

  @Put(':id')
  async updateProductByid(@Param('id')id, @Body()Payload){
      return await this.productService.update(id,Payload)
  }

//   @Delete(':id')
// async deleteProductById(@Param(':id')id:number){
// return await this.productService.remove(id)
// }

@Delete('deleteProduct/:name')
async deleteProductByName(@Param('name') name: string): Promise<void> {
    await this.productService.remove(name);
}
}
