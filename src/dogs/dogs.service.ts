import { Injectable, NotFoundException } from '@nestjs/common';
import { Dog } from './entities/dog.entity';
import { CreateDogDto } from './dto/create-dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';

@Injectable()
export class DogsService {
  private dogs: Dog[] = [
    { id: 1, nombre: 'Firulais', edad: 5, raza: 'Labrador' }
  ];

  findAll(): Dog[] {
    return this.dogs;
  }

  findOne(id: number): Dog {
    const perro = this.dogs.find(d => d.id === id);
    if (!perro) throw new NotFoundException(`Perro con id ${id} no encontrado`);
    return perro;
  }

  create(createDogDto: CreateDogDto): Dog {
    const nuevoPerro = {
      id: this.dogs.length > 0 ? Math.max(...this.dogs.map(d => d.id)) + 1 : 1,
      ...createDogDto,
    };
    this.dogs.push(nuevoPerro);
    return nuevoPerro;
  }

  update(id: number, updateDogDto: UpdateDogDto): Dog {
    const indice = this.dogs.findIndex(d => d.id === id);
    if (indice === -1) throw new NotFoundException(`Perro con id ${id} no encontrado`);
    
    this.dogs[indice] = { ...this.dogs[indice], ...updateDogDto };
    return this.dogs[indice];
  }

  remove(id: number): void {
    const indice = this.dogs.findIndex(d => d.id === id);
    if (indice === -1) throw new NotFoundException(`Perro con id ${id} no encontrado`);
    this.dogs.splice(indice, 1);
  }
}
