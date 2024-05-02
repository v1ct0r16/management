import { HttpException, Injectable } from '@nestjs/common';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './entities/product.entity';

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(ProductEntity)
    private ProductRepository: Repository<ProductEntity>,
){}

  async create(payload) {
    const add = this.ProductRepository.create(payload);
    return this.ProductRepository.save(add);
    // return 'This action adds a new product';
  }

  async findAll() {
    return await this.ProductRepository.find()
    // return `This action returns all product`;
  }

  async findOne(name :string):Promise<ProductEntity>{
    const find = await this.ProductRepository.findOne({ where: {name: name},});
    //error handling
    if (!find) {
        //this Error will be thrown if no such product name is not found in our database
        throw new HttpException('Product not found', 404); // it will be a  404 eroor, meaning not found
    }

    return find;
    // return `This action returns a #${id} product`;
  }

  async update(id: string, Payload) {
    const update = this.ProductRepository.findOne({where: { id }});
    if (!update) {
        throw new  HttpException('Product not found', 404);
    }

    const updateProduct = await this.ProductRepository.update(id, Payload);
    return{
        statusCode:201,
        message: 'Product update succesfully',
        data: updateProduct,
    }
    // return `This action updates a #${id} product`;
  }

  async remove(name: string):Promise<void> {
    const find = await this.ProductRepository.delete({ name });
    // if (result.affected === 0) {
    //     throw new HttpException('Product not found', 404); // it will be a  404 eroor, meaning not found
    // }
    // return `This action removes a #${id} product`;
  }
}
