<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useBusiness } from "~/composables/useBusiness";

const router = useRouter();
const route = useRoute();
const isEditMode = ref(false);

interface Product {
  name: string;
  description: string;
  category: string;
  price: number;
  quantity: number;
  imageUrl: string;
  businessId: string;
}

const product = reactive<Product>({
  name: "",
  description: "",
  category: "",
  price: 0,
  quantity: 0,
  imageUrl: "",
  businessId: String(route.params.businessId || ""),
});

async function fetchProductDetails(productId: string) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", productId)
    .single();

  if (error) {
    console.error("Error fetching product details:", error.message);
    return;
  }

  Object.assign(product, data);
}

async function handleSubmit() {
  try {
    let result;

    if (isEditMode.value) {
      result = await supabase
        .from("products")
        .update({
          name: product.name,
          description: product.description,
          category: product.category,
          price: product.price,
          quantity: product.quantity,
          imageUrl: product.imageUrl,
        })
        .eq("id", route.params.productId);
    } else {
      result = await supabase.from("products").insert([product]);
    }

    if (result.error) {
      throw result.error;
    }

    alert(
      isEditMode.value
        ? "Product updated successfully!"
        : "Product added successfully!"
    );
    router.push({
      name: "BusinessProfile",
      params: { id: product.businessId },
    });
  } catch (error: any) {
    console.error("Error saving product:", error.message);
    alert("Failed to save product. Please try again.");
  }
}

onMounted(() => {
  const productId = route.params.productId as string | undefined;
  if (productId) {
    isEditMode.value = true;
    fetchProductDetails(productId);
  }
});
</script>
